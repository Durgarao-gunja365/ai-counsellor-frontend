import AppLayout from "../components/AppLayout";
import Skeleton from "../components/Skeleton";

export default function DashboardSkeleton() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6">

        {/* Stage Indicator */}
        <Skeleton height={30} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton height={20} />
            <Skeleton height={20} />
            <Skeleton height={20} />
          </div>

          <div className="space-y-2">
            <Skeleton height={20} />
            <Skeleton height={20} />
            <Skeleton height={20} />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton height={18} />
          <Skeleton height={18} />
          <Skeleton height={18} />
        </div>

      </div>
    </AppLayout>
  );
}
