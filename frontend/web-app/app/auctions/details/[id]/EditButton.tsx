import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  id: string;
};

const EditButton = ({ id }: Props) => {
  return (
    <Button>
      <Link href={`/auctions/update/${id}`}>Update auction</Link>
    </Button>
  );
};

export default EditButton;
