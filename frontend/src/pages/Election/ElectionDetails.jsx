import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getElection,
  updateElection,
  deleteElection,
} from "../../api/electionApi";

import {
  addCandidate,
  deleteCandidate,
} from "../../api/candidateApi";

function ElectionDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [election, setElection] = useState(null);

  const [name, setName] = useState("");
  const [party, setParty] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  // =============================
  // Load Election
  // =============================

  const loadElection = async () => {

    try {

      setLoading(true);

      const res = await getElection(id);

      console.log(res.data);

      setElection(res.data.election);

      setEditData({
        title: res.data.election.title,
        description: res.data.election.description,
        startDate: res.data.election.startDate.slice(0,16),
        endDate: res.data.election.endDate.slice(0,16),
        status: res.data.election.status,
      });

    } catch (err) {

      console.log(err);

      alert("Election Not Found");

      navigate("/admin/elections");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadElection();

  }, []);

  // =============================
  // Update Election
  // =============================

  const handleSave = async()=>{

    try{

      await updateElection(id,editData);

      alert("Election Updated");

      setIsEditing(false);

      loadElection();

    }catch(err){

      console.log(err);

      alert("Update Failed");

    }

  }

  // =============================
  // Delete Election
  // =============================

  const handleDeleteElection = async()=>{

    if(!window.confirm("Delete this election?")) return;

    try{

      await deleteElection(id);

      alert("Election Deleted");

      navigate("/admin/elections");

    }catch(err){

      console.log(err);

      alert("Delete Failed");

    }

  }

  // =============================
  // Add Candidate
  // =============================

  const handleAddCandidate = async()=>{

    if(!name || !party){

      return alert("Enter Candidate Details");

    }

    try{

      await addCandidate(id,{
        name,
        party,
      });

      setName("");

      setParty("");

      loadElection();

    }catch(err){

      console.log(err);

      alert("Unable To Add Candidate");

    }

  }

  // =============================
  // Delete Candidate
  // =============================

  const handleDeleteCandidate = async(candidateId)=>{

    try{

      await deleteCandidate(candidateId);

      loadElection();

    }catch(err){

      console.log(err);

    }

  }

  if(loading){

    return(

      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white text-3xl">

        Loading Election...

      </div>

    )

  }

  if(!election){

    return(

      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white text-3xl">

        Election Not Found

      </div>

    )

  }

  return(
    <div className="min-h-screen bg-slate-950 text-white">

  <div className="max-w-7xl mx-auto px-8 py-8">

    {/* Header */}

    <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">

      <h1 className="text-5xl font-bold">

        {election.title}

      </h1>

      <p className="mt-4 text-cyan-100">

        {election.description}

      </p>

    </div>

    {/* ================= Statistics ================= */}

    <div className="grid lg:grid-cols-2 gap-8 mt-10">

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <h2 className="text-3xl font-bold mb-8">

          Election Information

        </h2>

        <div className="space-y-6">

          <div>

            <p className="text-slate-400">
              Status
            </p>

            <span className="inline-block mt-2 rounded-full bg-cyan-500/20 text-cyan-300 px-5 py-2">

              {election.status}

            </span>

          </div>

          <div>

            <p className="text-slate-400">
              Start Date
            </p>

            <h3 className="mt-2">

              {new Date(election.startDate).toLocaleString()}

            </h3>

          </div>

          <div>

            <p className="text-slate-400">
              End Date
            </p>

            <h3 className="mt-2">

              {new Date(election.endDate).toLocaleString()}

            </h3>

          </div>

        </div>

      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <h2 className="text-3xl font-bold mb-8">

          Statistics

        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-xl bg-slate-800 p-6">

            <p className="text-slate-400">

              Candidates

            </p>

            <h2 className="text-5xl font-bold mt-4">

              {election.candidates.length}

            </h2>

          </div>

          <div className="rounded-xl bg-slate-800 p-6">

            <p className="text-slate-400">

              Votes

            </p>

            <h2 className="text-5xl font-bold mt-4">

              {election.candidates.reduce(
                (sum, c) => sum + c.votes,
                0
              )}

            </h2>

          </div>

        </div>

      </div>

    </div>

    {/* ================= Add Candidate ================= */}

    <div className="mt-10 rounded-2xl bg-slate-900 border border-slate-800 p-8">

      <h2 className="text-3xl font-bold mb-8">

        Add Candidate

      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="rounded-xl bg-slate-800 border border-slate-700 px-5 py-4"
        />

        <input
          type="text"
          placeholder="Party Name"
          value={party}
          onChange={(e)=>setParty(e.target.value)}
          className="rounded-xl bg-slate-800 border border-slate-700 px-5 py-4"
        />

      </div>

      <button
        onClick={handleAddCandidate}
        className="mt-8 rounded-xl bg-cyan-600 px-8 py-3 font-semibold hover:bg-cyan-700"
      >

        Add Candidate

      </button>

    </div>

    {/* ================= Candidate List ================= */}

    <div className="mt-10 rounded-2xl bg-slate-900 border border-slate-800 p-8">

      <h2 className="text-3xl font-bold mb-8">

        Candidates

      </h2>
      {election.candidates.length === 0 ? (

  <div className="text-center py-12 text-slate-400">

    No Candidates Added Yet

  </div>

) : (

  <div className="space-y-4">

    {election.candidates.map((candidate) => (

      <div
        key={candidate._id}
        className="flex items-center justify-between rounded-xl bg-slate-800 p-5"
      >

        <div>

          <h3 className="text-xl font-bold">

            {candidate.name}

          </h3>

          <p className="text-slate-400">

            {candidate.party}

          </p>

          <p className="text-cyan-400 mt-2">

            Votes : {candidate.votes}

          </p>

        </div>

        <button
          onClick={() => handleDeleteCandidate(candidate._id)}
          className="rounded-xl bg-red-600 px-5 py-2 hover:bg-red-700 transition"
        >

          Delete

        </button>

      </div>

    ))}

  </div>

)}

    </div>

    {/* ================= Action Buttons ================= */}

    <div className="mt-10 flex flex-wrap gap-5">

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="rounded-xl bg-yellow-500 px-8 py-3 font-semibold hover:bg-yellow-600 transition"
      >

        {isEditing ? "Cancel Edit" : "Edit Election"}

      </button>

      <button
        onClick={handleDeleteElection}
        className="rounded-xl bg-red-600 px-8 py-3 font-semibold hover:bg-red-700 transition"
      >

        Delete Election

      </button>

    </div>

    {/* ================= Edit Form ================= */}

    {isEditing && (

      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <h2 className="text-3xl font-bold mb-8">

          Edit Election

        </h2>

        <div className="space-y-5">

          <input
            type="text"
            value={editData.title}
            onChange={(e)=>
              setEditData({
                ...editData,
                title:e.target.value
              })
            }
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4"
          />

          <textarea
            rows="4"
            value={editData.description}
            onChange={(e)=>
              setEditData({
                ...editData,
                description:e.target.value
              })
            }
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4"
          />

          <input
            type="datetime-local"
            value={editData.startDate}
            onChange={(e)=>
              setEditData({
                ...editData,
                startDate:e.target.value
              })
            }
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4"
          />

          <input
            type="datetime-local"
            value={editData.endDate}
            onChange={(e)=>
              setEditData({
                ...editData,
                endDate:e.target.value
              })
            }
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4"
          />

          <button
            onClick={handleSave}
            className="rounded-xl bg-green-600 px-8 py-3 font-semibold hover:bg-green-700 transition"
          >

            Save Changes

          </button>

        </div>

      </div>

    )}

  </div>

</div>

  );

}

export default ElectionDetails;