import { ClipboardCheck, Copy, MessageSquareText } from "lucide-react";
import { useState } from "react";
import { TextArea } from "../Input";
import Button from "../Button";

interface RawMessageViewerProps {
  message: string;
  title?: string;
}

export default function RawMessageViewer({
  message,
  title = "Raw Message",
}: RawMessageViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="space-y-3">
      <div className="relative">
        <TextArea label={title} readOnly value={message} rows={6} className="pr-12" />

        <Button
          onClick={handleCopy}
          iconOnly={true}
          size="sm"
          variant="tertiary"
          className="absolute top-8 right-2"
        >
          {copied ? (
            <ClipboardCheck height="16px" width="16px" />
          ) : (
            <Copy height="16px" width="16px" />
          )}
        </Button>
      </div>
    </section>
  );
}
