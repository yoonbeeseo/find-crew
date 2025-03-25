import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { jobDescs } from "../../constants";
import useTextInput from "../../components/ui/useTextInput";
import useSelect from "../../components/ui/useSelect";
import { emailValidator } from "../../utils/validator";
import ExForm from "./ExForm";

export default function AuthPage() {
  const params = useSearchParams()[0].get("target");

  const extractor = (params: string | null): TeamUserJob[] => {
    if (!params) {
      return [];
    }
    const copy = params.replace(",", "");
    const split = copy.split(" ");
    return split.splice(0, 2) as TeamUserJob[];
  };

  const [teamUser, setTeamUser] = useState(initialState);
  const [targets, setTargets] = useState(extractor(params));
  const [password, setPassword] = useState("");

  const [isInsertingEx, setIsInsertingEx] = useState(false);

  const content = useSearchParams()[0].get("content");
  const navi = useNavigate();
  const location = useLocation();

  const Name = useTextInput();
  const Email = useTextInput();
  const Password = useTextInput();
  const Job = useSelect();

  const emailMessage = useMemo(() => {
    const isEmailValid = emailValidator(teamUser.email);

    return isEmailValid ? null : "이메일을 확인해주세요.";
  }, [teamUser.email]);
  const nameMessage = useMemo(() => {
    if (teamUser.name.length === 0) {
      return "이름을 입력하세요.";
    }
    if (teamUser.name.length < 2) {
      return "이름이 너무 짧습니다.";
    }
    return null;
  }, [teamUser.name]);
  const passwordMessage = useMemo(() => {
    if (password.length === 0) {
      return "비밀번호를 입력하세요.";
    }
    if (password.length < 6) {
      return "비밀번호가 너무 짧습니다.";
    }
    if (password.length > 12) {
      return "비밀번호가 너무 깁니다.";
    }
    return null;
  }, [password]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!content) {
        if (targets.length === 0) {
          alert("찾으시는 직군을 선택해주세요.");
          return;
        }
        return navi(`${location.pathname}?content=기본정보`);
      }

      switch (content) {
        case "기본정보":
          if (nameMessage) {
            alert(nameMessage);
            return Name.focus();
          }
          if (teamUser.jobDesc.length === 0) {
            alert("전문 분야를 선택해주세요.");
            return Job.showPicker();
          }
          if (emailMessage) {
            alert(emailMessage);
            return Email.focus();
          }
          if (passwordMessage) {
            alert(passwordMessage);
            return Password.focus();
          }

          return navi(`${location.pathname}?content=경력`);
      }
    },
    [
      content,
      targets,
      navi,
      location,
      Name,
      Job,
      Email,
      nameMessage,
      emailMessage,
      passwordMessage,
      Password,
      teamUser,
    ]
  );

  return (
    <div>
      <form className="col gap-y-2.5 p-5 max-w-100 mx-auto" onSubmit={onSubmit}>
        {!content ? (
          <div>
            <h1>어떤 직군을 영입하고 싶으신가요?</h1>
            <p>여러 직군을 복수 선택할 수 있습니다.</p>
            <ul className="wrap">
              {jobDescs.map((job) => {
                const selected = targets.find((item) => item === job)
                  ? true
                  : false;
                const onClick = () => {
                  setTargets((prev) =>
                    selected
                      ? prev.filter((item) => item !== job)
                      : [...prev, job]
                  );
                };
                return (
                  <li key={job}>
                    <button
                      type="button"
                      onClick={onClick}
                      className={twMerge(
                        "rounded-full bg-white border text-theme",
                        selected && "primary bg-theme text-white"
                      )}
                    >
                      {job}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          {
            기본정보: (
              <>
                <div className="row gap-x-2.5">
                  <Name.Component
                    label="이름"
                    onChangeText={(name) =>
                      setTeamUser((prev) => ({ ...prev, name }))
                    }
                    value={teamUser.name}
                    divClassName="flex-2"
                    message={nameMessage}
                    onSubmitEditing={() => {
                      if (nameMessage) {
                        alert(nameMessage);
                        return Name.focus();
                      }
                      Job.showPicker();
                    }}
                  />
                  <Job.Component
                    containerClassName="flex-1"
                    data={jobDescs}
                    onChangeSelect={(job) => {
                      setTeamUser((prev) => ({
                        ...prev,
                        jobDesc: job as TeamUserJob,
                      }));
                      Email.focus();
                    }}
                    value={teamUser.jobDesc}
                    label="전문 분야"
                  />
                </div>

                <Email.Component
                  label="이메일"
                  onChangeText={(email) =>
                    setTeamUser((prev) => ({ ...prev, email }))
                  }
                  value={teamUser.email}
                  message={emailMessage}
                  onSubmitEditing={() => {
                    if (emailMessage) {
                      alert(emailMessage);
                      return Email.focus();
                    }
                    console.log("submit gogo");
                  }}
                />
                <Password.Component
                  label="비밀번호"
                  onChangeText={setPassword}
                  value={password}
                  message={passwordMessage}
                  onSubmitEditing={() => {
                    if (passwordMessage) {
                      alert(passwordMessage);
                      return Password.focus();
                    }
                  }}
                  props={{ type: "password" }}
                />
              </>
            ),
            경력: (
              <>
                <div className="col">
                  <label htmlFor="ex-form" className="text-sm text-gray-500">
                    경력추가
                  </label>

                  {teamUser.experiences.length > 0 && (
                    <ul className="my-2.5">
                      {teamUser.experiences.map((ex) => (
                        <li key={ex.name}>
                          <p>{ex.name}</p>
                          <ul>
                            {ex.descs.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsInsertingEx(true)}
                    id="ex-form"
                    className={twMerge(
                      teamUser.experiences.length === 0 && "mt-1"
                    )}
                  >
                    경력 추가
                  </button>
                </div>

                {isInsertingEx && (
                  <div className="fixed">
                    <ExForm
                      onCancel={() => setIsInsertingEx(false)}
                      onChange={(ex) =>
                        setTeamUser((prev) => ({
                          ...prev,
                          experiences: [ex, ...prev.experiences],
                        }))
                      }
                    />
                  </div>
                )}
              </>
            ),
          }[content]
        )}
        <div className="row gap-x-2.5 mt-2.5">
          <button type="button" className="flex-1" onClick={() => navi(-1)}>
            이전
          </button>
          <button className="primary px-5 flex-2">다음</button>
        </div>
      </form>
    </div>
  );
}

const initialState: TeamUser = {
  email: "",
  experiences: [],
  intro: "",
  jobDesc: "개발자",
  mobile: "010",
  name: "",
  targets: [],
  uid: "",
};
