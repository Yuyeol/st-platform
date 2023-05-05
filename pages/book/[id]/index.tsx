import InputBar from "@/components/book/detail/input-bar";
import UnderlinedButton from "@/components/core/button/underlined-button";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import ToolsCol from "@/components/header/tools-col";
import Edit from "@/components/icon/edit";
import Layout from "@/components/layout";
import { HEADER_ICON_COLOR, HEADER_ICON_WIDTH } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const BookDetail = () => {
  const router = useRouter();
  console.log();

  const { data } = useSWR(
    router.query.id ? `/api/book/${router.query.id}` : null
  );
  console.log(data);

  return (
    <Layout>
      <Header
        col1={<TitleCol hasBackBtn>{data?.book.title}</TitleCol>}
        col2={
          <ToolsCol>
            <Link href={`/book/${data?.book.id}/edit`}>
              <Edit width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
          </ToolsCol>
        }
      />
      <div className="p-4">
        <div className="p-4 rounded-lg bg-slate-100">
          <div className="flex justify-between text-xs">
            <div className="">p.12</div>
            <div>2022.2.1</div>
          </div>
          <div>comment ... ok write</div>
          <div className="flex justify-end gap-2">
            <button className="mr-auto">toggle mark</button>
            <UnderlinedButton text="edit" />
            <UnderlinedButton text="delete" />
          </div>
        </div>
      </div>
      <InputBar />
    </Layout>
  );
};
export default BookDetail;