import Item from "@/components/book/item";
import Plus from "@/components/icon/plus";
import Layout from "@/components/layout";
import { Book } from "@prisma/client";
import Link from "next/link";
import useSWR from "swr";
import { HEADER_ICON_WIDTH, HEADER_ICON_COLOR } from "@/constants";
import Search from "@/components/icon/search";
import Filter from "@/components/icon/filter";
import ToolsCol from "@/components/header/tools-col";
import TitleCol from "@/components/header/title-col";
import Header from "@/components/header";

const Home = () => {
  const { data } = useSWR("/api/book");

  return (
    <Layout>
      <Header
        col1={<TitleCol>Book</TitleCol>}
        col2={
          <ToolsCol>
            <Link href="/book/upload">
              <Plus width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
            <Link href="/search">
              <Search width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
            <button>
              <Filter width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </button>
          </ToolsCol>
        }
      />
      <ul className="px-4 divide-y-2">
        {data?.books.map((book: Book) => (
          <Item key={book.id} book={book} />
        ))}
      </ul>
    </Layout>
  );
};
export default Home;
