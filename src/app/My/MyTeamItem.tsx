interface MyTeamItemProp extends ItemProps<MatchingTeam> {
  onDelete: () => void;
}

const MyTeamItem = ({ item, onDelete }: MyTeamItemProp) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
};

export default MyTeamItem;
