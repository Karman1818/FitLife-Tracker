import Link from "next/link";
import { FaUserCircle, FaWeight, FaRulerVertical, FaCalculator, FaUtensils, FaArrowLeft } from "react-icons/fa";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page(props: PageProps) {
  const { id } = await props.params;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-medium backdrop-blur-md transition-all shadow-md hover:scale-[1.02]"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
        {/* User Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-white/10 pb-6 text-center sm:text-left">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-white shadow-lg">
            <FaUserCircle className="w-16 h-16 text-green-400" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Profile</h1>
            <p className="text-white/70 text-sm">
              Logged in identifier: <span className="text-white font-mono font-semibold bg-white/10 px-2.5 py-0.5 rounded-lg ml-1">{id}</span>
            </p>
          </div>
        </div>

        {/* Health Metrics Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FaCalculator className="w-4 h-4 text-emerald-400" />
            <span>Health Metrics Overview</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <FaWeight className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-white/60 uppercase font-semibold">Weight</p>
                <p className="text-lg font-bold text-white">70 kg</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <FaRulerVertical className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs text-white/60 uppercase font-semibold">Height</p>
                <p className="text-lg font-bold text-white">175 cm</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <FaCalculator className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-xs text-white/60 uppercase font-semibold">BMI Score</p>
                <p className="text-lg font-bold text-green-400">22.86 <span className="text-xs font-normal text-white/60">(Normal)</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Meals Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FaUtensils className="w-4 h-4 text-green-400" />
            <span>Recent Logged Meals</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
              <p className="text-xs font-semibold text-green-400 uppercase tracking-wider">Breakfast</p>
              <p className="font-medium text-white text-base">Oatmeal with Berries</p>
              <p className="text-xs text-white/60">300 kcal</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Lunch</p>
              <p className="font-medium text-white text-base">Chicken with Brown Rice</p>
              <p className="text-xs text-white/60">600 kcal</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
              <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Dinner</p>
              <p className="font-medium text-white text-base">Mediterranean Salad</p>
              <p className="text-xs text-white/60">200 kcal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
