import UnderlinedButton from "@/components/core/button/underlined-button";
import { getElapsedTime } from "@/lib/client/getElapsedTime";
import useMutation from "@/lib/client/useMutation";
import { Memo } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

interface IProps {
  memo: Memo;
  selectMemo: (id: number) => void;
}

const Memo = ({ memo, selectMemo }: IProps) => {
  const router = useRouter();
  const { mutation, loading } = useMutation(
    `/api/book/${router.query.id}/memo`
  );
  const onDelete = (id: number) => {
    if (loading) return;
    mutation({ id: id }, "DELETE");
  };
  return (
    <div className="p-4">
      <div className="px-3 py-2 rounded-lg bg-slate-100">
        <div className="flex items-center justify-between text-xs border-b-[1px] border-slate-400 pb-2 mb-1">
          <div className="">Page. {memo.page}</div>
          <div className="text-xs">
            {getElapsedTime(memo.updatedAt) ?? getElapsedTime(memo.createdAt)}
          </div>
        </div>
        <div>{memo.content}</div>
        <div className="flex justify-end gap-2">
          {/* TODO: edit 클릭 시 자동으로 toggle open하도록 구현하기. */}
          <UnderlinedButton text="edit" onClick={() => selectMemo(memo.id)} />
          <UnderlinedButton text="delete" onClick={() => onDelete(memo.id)} />
        </div>
      </div>
    </div>
  );
};
export default Memo;
