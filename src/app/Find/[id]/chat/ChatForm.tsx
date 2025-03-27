import { useCallback, useState } from "react";
import useTextInput from "../../../../components/ui/useTextInput";
import AppForm from "../../../../components/ui/AppForm";

interface Props {
  myUid: string;
  uid: string;
}

const ChatForm = ({ myUid, uid }: Props) => {
  const [message, setMessage] = useState("");
  const Message = useTextInput();

  const onSubmit = useCallback(() => {
    if (message.length === 0) {
      alert("아무것도 입력되지 않았습니다.");
      return Message.focus();
    }
    console.log({ message });

    const newMessage: Chat = {
      createdAt: new Date().toLocaleString(),
      id: "",
      message,
      uid: myUid,
      uids: [myUid, uid],
    };

    console.log({ newMessage });
  }, [message, uid, myUid, Message]);
  return (
    <AppForm
      className="flex-row gap-x-2.5 max-w-auto w-full"
      onSubmit={onSubmit}
    >
      <Message.Component
        value={message}
        onChangeText={setMessage}
        label=""
        resetHidden
        divClassName="flex-1"
        props={{
          className: "border-none focus:bg-lightgray",
        }}
      />
      <button className="primary">전송</button>
    </AppForm>
  );
};

export default ChatForm;
