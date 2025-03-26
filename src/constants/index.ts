export interface HomeDesc {
  title: string;
  subTitle: string;
  btnTitle: string;
}

export const homeDescs: HomeDesc[] = [
  {
    title: "개발자 라면",
    subTitle:
      "예쁜 디자인을 함께 보면서 개발하세요. 튼튼한 기획 아래에서 개발에 집중하세요.",
    btnTitle: "디자이너, 기획자 찾기",
  },
  {
    title: "디자이너 라면",
    subTitle:
      "상품을 구현해줄 수 있는 개발자와 함께 디자인 하세요. 견고한 기획서와 함께 상품을 디자인 하세요.",
    btnTitle: "개발자, 기획자 찾기",
  },
  {
    title: "기획자 라면",
    subTitle:
      "구현 가능 정도를 파악한 채로 기획하세요. 디자인 목업을 보면서 상상속의 기획 상품을 눈으로 확인하며 기획하세요.",
    btnTitle: "디자이너, 개발자 찾기",
  },
];

export const jobDescs: TeamUserJob[] = [
  "개발자",
  "공동대표",
  "기획자",
  "대표자",
  "디자이너",
];

export const initialUser: TeamUser = {
  email: "123",
  experiences: [],
  intro: "asdfadsf",
  jobDesc: "개발자",
  mobile: "1231",
  name: "Dexter Yoon",
  targets: ["개발자", "대표자", "기획자", "디자이너"],
  uid: "1234123412",
};

export const teams: MatchingTeam[] = [
  {
    name: "DW아카데미",
    intro: "DW아카데미는 학원입니다.",
    descs: ["디자인 가능한 개발자 구함", "UI 맛깔나게 작성가능자 구함"],
    members: [initialUser],
    targets: ["디자이너"],
    uid: "123",
    fid: "",
    id: "1",
  },
  {
    name: "그린컴퓨터아카데미",
    intro: "그린컴퓨터아카데미는 또 다른 학원입니다.",
    descs: ["잡무 할 사람 구함", "청소 잘하면 우대", "개발도 잘해야 함"],
    members: [initialUser],
    targets: ["개발자"],
    uid: "1213",
    fid: "",
    id: "2",
  },
  {
    name: "패스트캠퍼스",
    intro: "패스트캠퍼스도 학원입니다. 특히 온라인 학원",
    descs: [
      "리액트 강사 구함",
      "리액트 잘 해야함",
      "강의도 잘 해야함",
      "보수 많이 줌",
    ],
    members: [initialUser],
    targets: ["개발자", "디자이너", "기획자"],
    uid: "1323",
    fid: "",
    id: "3",
  },
  {
    name: "또스",
    intro: "",
    descs: [
      "프로덕트 맛있게 디자인 하는 사람 구함",
      "자기 주도 프로덕트 개발 기획 디자인 가능자 우대",
    ],
    members: [initialUser],
    targets: ["기획자", "개발자"],
    uid: "1123",
    fid: "",
    id: "4",
  },
];
