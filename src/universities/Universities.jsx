import { useEffect, useState } from "react";
import api from "../api/client";
import AppLayout from "../components/AppLayout";
import WhyUniversity from "../components/WhyUniversity";
import Skeleton from "../components/Skeleton";

const shortlist = async (name) => {
  try {
    await api.post(
      `/universities/shortlist?university_name=${encodeURIComponent(name)}`
    );
    alert("University shortlisted");
  } catch (err) {
    alert(err.response?.data?.detail || "Error shortlisting");
  }
};

const lockUniversity = async (name) => {
  const ok = window.confirm(
    "Locking is a commitment. This will generate application tasks and block discovery."
  );
  if (!ok) return;

  try {
    await api.post(
      `/universities/lock?university_name=${encodeURIComponent(name)}`
    );
    alert("University locked");
  } catch (err) {
    alert(err.response?.data?.detail || "Error locking university");
  }
};

export default function Universities() {
  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/universities/discover")
      .then(res => {
        setGroups(res.data.universities);
      })
      .catch(() => {
        setError("Failed to load universities");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ✅ Loading skeleton */
  if (loading) {
    return (
      <AppLayout>
        <div className="p-8 space-y-4">
          <Skeleton height={28} />
          <Skeleton height={90} />
          <Skeleton height={90} />
        </div>
      </AppLayout>
    );
  }

  /* ❌ Error state */
  if (error) {
    return (
      <AppLayout>
        <p className="p-8 text-red-600">{error}</p>
      </AppLayout>
    );
  }

  /* ✅ Empty state */
  if (!groups) {
    return (
      <AppLayout>
        <p className="p-8 text-gray-500">
          No universities found for your profile.
        </p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="py-14 space-y-6">
        <h2 className="text-xl font-bold">University Recommendations</h2>

        <UniversityGroup title="Dream Universities" list={groups.dream} />
        <UniversityGroup title="Target Universities" list={groups.target} />
        <UniversityGroup title="Safe Universities" list={groups.safe} />
      </div>
    </AppLayout>
  );
}

function UniversityGroup({ title, list }) {
  if (!list || list.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="space-y-2">
        {list.map(name => (
          <li key={name} className="border p-3 rounded bg-white">
            <div className="flex justify-between items-center">
              <span>{name}</span>
              <WhyUniversity universityName={name} />
            </div>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => shortlist(name)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm"
              >
                Shortlist
              </button>

              <button
                onClick={() => lockUniversity(name)}
                className="px-3 py-1 bg-black text-white rounded text-sm"
              >
                Lock
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
