type TextFieldProps = {
  label: string;
  content: string;
};

export default function TextField({ label, content }: TextFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="label">{label}</span>
      <p className="border border-gray-300 rounded p-2 min-h-10">{content}</p>
    </div>
  );
}
