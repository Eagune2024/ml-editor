import { Skeleton } from "@/components/ui/skeleton"

export default function DemoView () {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="animate-pulse h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="animate-pulse h-4 w-[250px]" />
        <Skeleton className="animate-pulse h-4 w-[200px]" />
      </div>
    </div>
  )
}