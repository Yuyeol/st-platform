import Item from "@/components/friends/item";
import Header from "@/components/header";
import ToolsCol from "@/components/header/tools-col";
import TitleCol from "@/components/header/title-col";
import Layout from "@/components/layout";
import { HEADER_ICON_COLOR, HEADER_ICON_WIDTH } from "@/constants";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { Book, User } from "@prisma/client";
import Search from "@/components/icon/search";
import Link from "next/link";

export interface IUserWithBooks extends User {
  books: Book[];
}
export interface IUserWithFriends extends IUserWithBooks {
  friendsTo: IUserWithBooks[];
}

const Friends = () => {
  const { data: session } = useSession();
  const { data: userData } = useSWR<{
    ok: boolean;
    user: IUserWithFriends;
  }>(session?.user?.id ? `/api/users/${session.user.id}` : null);

  if (userData?.user.friendsTo)
    return (
      <Layout>
        <Header
          col1={<TitleCol>Friends</TitleCol>}
          col2={
            <ToolsCol>
              <Link href="/friends/search">
                <Search width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
              </Link>
            </ToolsCol>
          }
        />
        <ul className="px-4 divide-y-2">
          {userData?.user.friendsTo.map((friend) => (
            <Item key={friend.id} friend={friend} />
          ))}
        </ul>
      </Layout>
    );
};
export default Friends;
