import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getElection } from "../../api/electionApi";
import { submitVote } from "../../api/voteApi";

function StudentElectionDetails() {

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [election, setElection] = useState(null);

  const [selectedCandidate, setSelectedCandidate] = useState("");

  // ====================================
  // Load Election
  // ====================================

  const loadElection = async () => {

    try{

      setLoading(true);

      const res = await getElection(id);

      setElection(res.data.election);

    }catch(err){

      console.log(err);

    }finally{

      setLoading(false);

    }

  }

  useEffect(()=>{

    loadElection();

  },[]);

  // ====================================
  // Submit Vote
  // ====================================

  const handleVote = async()=>{

    if(!selectedCandidate){

      return alert("Please select a candidate.");

    }

    try{

      await submitVote({

        electionId:election._id,

        candidateId:selectedCandidate,

      });

      alert("Vote Submitted Successfully!");

      loadElection();

    }catch(err){

      console.log(err);

      alert("Voting Failed");

    }

  }

  if(loading){

    return(

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl">

        Loading Election...

      </div>

    )

  }

  if(!election){

    return(

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl">

        Election Not Found

      </div>

    )

  }

  return(
    <div className="min-h-screen bg-slate-950 text-white">

  <div className="max-w-7xl mx-auto px-8 py-8">

    {/* Header */}

    <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-xl">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">

        <div>

          <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm">

            Active Election

          </span>

          <h1 className="mt-4 text-5xl font-bold">

            {election.title}

          </h1>

          <p className="mt-4 text-cyan-100">

            {election.description}

          </p>

        </div>

        <div className="mt-6 lg:mt-0">

          <h3 className="text-xl font-semibold">

            Blockchain Status

          </h3>

          <p className="mt-2 text-green-300">

            Secure & Verified

          </p>

        </div>

      </div>

    </div>

    {/* Election Information */}

    <div className="grid lg:grid-cols-2 gap-8 mt-10">

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <h2 className="text-3xl font-bold mb-8">

          Election Information

        </h2>

        <div className="space-y-5">

          <div>

            <p className="text-slate-400">

              Status

            </p>

            <span className="inline-block mt-2 rounded-full bg-green-500/20 text-green-300 px-5 py-2">

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
                (sum,c)=>sum+c.votes,
                0
              )}

            </h2>

          </div>

        </div>

      </div>

    </div>

    {/* Candidate List */}

    <div className="mt-10 rounded-2xl bg-slate-900 border border-slate-800 p-8">

      <h2 className="text-3xl font-bold mb-8">

        Select Your Candidate

      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {election.candidates.length === 0 ? (

  <div className="col-span-2 text-center py-10">

    <h3 className="text-2xl font-bold text-red-400">
      No Candidates Available
    </h3>

    <p className="mt-3 text-slate-400">
      The administrator hasn't added candidates yet.
    </p>

  </div>

) : (

  election.candidates.map((candidate) => (

    <label
      key={candidate._id}
      className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
        selectedCandidate === candidate._id
          ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
          : "border-slate-700 bg-slate-800 hover:border-cyan-400"
      }`}
    >

      <div className="flex items-start gap-4">

        <input
          type="radio"
          name="candidate"
          value={candidate._id}
          checked={selectedCandidate === candidate._id}
          onChange={(e) =>
            setSelectedCandidate(e.target.value)
          }
          className="mt-2 accent-cyan-500"
        />

        <div className="flex-1">

          <div className="flex items-center justify-between">

            <h3 className="text-2xl font-bold">
              {candidate.name}
            </h3>

            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
              Verified
            </span>

          </div>

          <p className="mt-3 text-slate-400">
            <span className="font-semibold text-white">
              Party:
            </span>{" "}
            {candidate.party}
          </p>

          <p className="mt-4 text-slate-300">
            {candidate.manifesto || "No manifesto available."}
          </p>

        </div>

      </div>

    </label>

  ))

)}

      </div>

      {/* Action Buttons */}

      <div className="mt-10 flex flex-col md:flex-row gap-4">

        <button
          onClick={handleVote}
          disabled={!selectedCandidate}
          className={`flex-1 rounded-xl py-4 font-semibold transition ${
            !selectedCandidate
              ? "cursor-not-allowed bg-slate-700"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02]"
          }`}
        >
          Cast My Vote
        </button>

        <Link
          to="/student/dashboard"
          className="flex-1 rounded-xl border border-slate-700 py-4 text-center hover:bg-slate-800 transition"
        >
          Back to Dashboard
        </Link>

      </div>

    </div>

  </div>

</div>

  );

}

export default StudentElectionDetails;
      