 
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
export default function SideBarMenu ({items}) {
  return (
    <div className="space-y-3">
    <h1 className="text-sm text-gray-700">Dkash</h1>

    {items.map((item) =>
      !item.items ? (
        <Link key={item.title} href={item.url} className="flex items-center space-x-2">
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      ) : (
        <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="">
          <div>
            <CollapsibleTrigger asChild>
              <div className="flex items-center  relative space-x-2 cursor-pointer">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="absolute right-1 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-5 pt-2">
              {item.items?.map((subItem) => (
                <Link
                  key={subItem.title}
                  href={subItem.url}
                  className="flex items-center space-x-1 pb-2"
                >
                  {subItem.icon && <subItem.icon className="size-5" />}
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </CollapsibleContent>
          </div>
        </Collapsible>
      )
    )}
  </div>
  );
}
