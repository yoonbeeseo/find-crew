import { useParams } from "react-router-dom";
import { TEAM } from "../../../../context/zustand.store";
import { useQuery } from "@tanstack/react-query";
import { db, FBCollection } from "../../../../lib/firebase";
import Loading from "../../../../components/Loading";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ChatForm from "./ChatForm";

const ChatPage = (user: TeamUser) => {
  const params = useParams<{ id: string }>();

  const { team, setTeam } = TEAM.store();

  const ref = db.collection(FBCollection.MATCHING).doc(params.id);

  const { isPending, error, data } = useQuery({
    queryKey: ["teams", params.id],
    queryFn: async (): Promise<MatchingTeam | null> => {
      try {
        const snap = await ref.get();
        const data = { ...snap.data(), id: snap.id } as MatchingTeam;
        if (!data) {
          return null;
        }
        return data;
      } catch (error: any) {
        console.log(error);
        return null;
      }
    },
    initialData: team,
  });

  const [texts, setTexts] = useState<Chat[]>([]);

  useEffect(() => {
    //! 순서를 만들어주는 함수 orderBy(조건이될 값, 오름차순/내림차순)
    const subMessages = ref
      .collection(user.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const data = snap.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as Chat)
        );
        if (data) {
          setTexts(data);
        } else {
          setTexts([]);
        }
      });

    subMessages;
    return subMessages;
  }, [params.id, ref, user.uid]);

  if (isPending) {
    return <Loading message="공고를 불러오고 있습니다..." />;
  }
  if (error) {
    return (
      <Loading
        message={`Error: ${error.message}`}
        iconClassName="text-red-500"
      />
    );
  }
  if (!data) {
    return (
      <Loading
        message="존재하지 않는 공고입니다."
        iconClassName="text-zinc-900"
      />
    );
  }

  return (
    <div className="border h-[calc(100vh-60px)] border-red-500 col">
      <div className="flex-1 bg-lightGray">
        <ul>
          {texts.map((text) => (
            <li
              key={text.id}
              className={twMerge(
                "border col",
                user.uid === text.uid && "items-end"
              )}
            >
              <div
                className={twMerge(
                  "p-2.5 border border-border max-w-75 rounded-xl relative",
                  user.uid === text.uid && "bg-theme text-white"
                )}
              >
                {text.message}
                <span className="absolute bottom-0 right-[calc(100%+10px)] w-full text-right text-gray-400">
                  {text.createdAt}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ChatForm myUid={user.uid} uid={data?.uid as string} />
    </div>
  );
};

export default ChatPage;
