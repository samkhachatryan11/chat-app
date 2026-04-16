type SearchInputProps = {
  placeholder: string;
};

export function SearchInput({ placeholder }: SearchInputProps) {
  return (
    <div>
      <input
        className="bg-gray-200 text-gray-600 w-full"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}
