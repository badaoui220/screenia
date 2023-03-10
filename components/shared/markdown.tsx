import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

const Markdown: FunctionComponent<Props> = ({ content }) => {
  return (
    <div className="px-5 pt-20 prose lg:prose-xl">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Markdown;
