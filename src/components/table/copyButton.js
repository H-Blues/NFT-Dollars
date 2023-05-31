import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center space-x-2">
      <CopyToClipboard text={textToCopy}>
        <button
          className="flex items-center justify-center rounded-md bg-transparent p-1 hover:bg-gray-100 focus:outline-none"
          onClick={handleCopy}
        >
          {!copied && <ClipboardDocumentIcon className="w-4 h-4" />}
          {copied && <CheckIcon variant="text" color="green" className="w-4 h-4" />}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CopyButton;
