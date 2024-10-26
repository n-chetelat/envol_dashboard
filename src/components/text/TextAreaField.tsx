type TextAreaFieldProps = {
  label: string;
  content: string;
};

export default function TextAreaField({ label, content }: TextAreaFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="label">{label}</span>
      <p className="border border-gray-300 rounded p-2 min-h-10 whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}
