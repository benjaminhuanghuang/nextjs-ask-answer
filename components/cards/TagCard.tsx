import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/routes";
import { techMap } from "@/constants/techMap";
import { cn } from "@/lib/utils";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const iconClass = techMap[name.toLowerCase()];

  const content = (
    <>
      <div className="flex items-center gap-1.5">
        {iconClass ? (
          <i className={cn(iconClass, "text-sm")} />
        ) : (
          <Image
            src="/icons/tag.svg"
            alt="tag"
            width={12}
            height={12}
            className="invert dark:invert-0"
          />
        )}
        <span className="text-xs font-medium text-dark-400 dark:text-light-800">
          {name}
        </span>
      </div>

      {showCount && (
        <p className="text-xs font-medium text-dark-500 dark:text-light-400">
          {questions}
        </p>
      )}

      {remove && (
        <button
          type="button"
          onClick={handleRemove}
          className="cursor-pointer"
        >
          <Image
            src="/icons/close.svg"
            alt="close"
            width={12}
            height={12}
            className="dark:invert"
          />
        </button>
      )}
    </>
  );

  const badgeClassName = cn(
    "flex items-center justify-between gap-2 rounded-md border border-light-700 dark:border-dark-400 bg-light-800 dark:bg-dark-300",
    compact ? "px-4 py-2" : "px-5 py-2.5"
  );

  if (isButton) {
    return <div className={badgeClassName}>{content}</div>;
  }

  return (
    <Link href={ROUTES.TAG(_id)} className={badgeClassName}>
      {content}
    </Link>
  );
};

export default TagCard;
