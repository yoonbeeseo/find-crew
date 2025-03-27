import { useQuery } from "@tanstack/react-query";
import { db, FBCollection } from "../../lib/firebase";
import Loading from "../../components/Loading";
import { teams } from "../../constants";
import { Link } from "react-router-dom";

const Team = (user: TeamUser) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["matchingTeam", user.uid],
    queryFn: async (): Promise<MatchingTeam[]> => {
      try {
        const ref = db
          .collection(FBCollection.USERS)
          .doc(user.uid)
          .collection(FBCollection.MY);

        const snap = await ref.get();

        const data = snap.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as MatchingTeam)
        );

        if (!data) {
          console.log("no data");
          return [];
        }
        return data;
      } catch (error: any) {
        console.log(error);
        return [];
      }
    },
  });

  if (isPending) {
    return <Loading message="매칭중인 팀을 불러오고 있습니다..." />;
  }
  if (error || !data) {
    return (
      <Loading
        message={`Error: ${error.message}`}
        iconClassName="text-red-500"
      />
    );
  }

  return (
    <div className="p-5">
      <h1>매칭 진행 중인 팀 {data.length}개</h1>
      <ul className="col gap-y-2.5 my-5">
        {data.map((team) => (
          <li key={team.id}>
            <Link
              to={
                `/find/${team.id}/chat${team.uid === user.uid ? "" : user.uid}`

                // team.uid === user.uid
                //   ? `/find/${team.id}/chat`
                //   : `/find/${team.id}/chat?cid=${user.uid}`
              }
            >
              <b>[{team.name}]</b>
              {team.targets.length}개의 직군을 찾고 있음
            </Link>
          </li>
        ))}
      </ul>
      <Link to={"/find"}>나의 팀 찾기</Link>
      <button
        onClick={async () => {
          try {
            const ref = db.collection(FBCollection.MATCHING);

            for (const team of teams) {
              const doc = await ref.add(team);
              console.log(doc);
              console.log(team.name, "공고 등록 완료");
            }
            console.log("데이터 업데이트 됨");
          } catch (error: any) {
            console.log(error);
            alert(error.message);
          }
        }}
      >
        INIT
      </button>
    </div>
  );
};

export default Team;

//! 데이터 베이스에 주입하는 방법 아래 참고
{
  /* <button
        onClick={async () => {
          try {
            const ref = db.collection(FBCollection.MATCHING);

            for (const team of teams) {
              const doc = await ref.add(team);
              console.log(doc);
              console.log(team.name, "공고 등록 완료");
            }
            console.log("데이터 업데이트 됨");
          } catch (error: any) {
            console.log(error);
            alert(error.message);
          }
        }}
      >
        INIT
      </button> */
}
