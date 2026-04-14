import ContactList from "@/features/chat/components/ContactList";
import { SearchInput } from "@/shared/ui/inputs/SearchInput";

export default function SideBar() {
  return (
    <div className="flex flex-col bg-white rounded-xl w-full max-w-3xs">
      <div className="border-b border-gray-300 p-2">
        <SearchInput />
      </div>
      <div className="p-1">
        <ContactList />
      </div>
    </div>
  );
}
