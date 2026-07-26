import { useElection } from "../../context/ElectionContext";

function Results() {
  const { elections } = useElection();

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Election Results
      </h1>

      {elections.length === 0 ? (

        <div className="bg-white p-8 rounded-xl shadow">
          No Elections Found
        </div>

      ) : (

        elections.map((election) => {

          const totalVotes = election.candidates.reduce(
            (sum, candidate) => sum + candidate.votes,
            0
          );

          const leader =
            election.candidates.length > 0
              ? election.candidates.reduce((a, b) =>
                  a.votes > b.votes ? a : b
                )
              : null;

          return (

            <div
              key={election.id}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >

              <h2 className="text-3xl font-bold">
                {election.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {election.description}
              </p>

              <div className="mt-6">

                <h3 className="text-xl font-semibold">
                  Total Votes : {totalVotes}
                </h3>

              </div>

              <div className="mt-8 space-y-6">

                {election.candidates.map((candidate) => {

                  const percentage =
                    totalVotes === 0
                      ? 0
                      : (
                          (candidate.votes / totalVotes) *
                          100
                        ).toFixed(1);

                  return (

                    <div key={candidate.id}>

                      <div className="flex justify-between mb-2">

                        <div>
                          <h3 className="font-bold text-lg">
                            {candidate.name}
                          </h3>

                          <p className="text-gray-600">
                            {candidate.party}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="font-bold">
                            {candidate.votes} Votes
                          </p>

                          <p className="text-blue-600">
                            {percentage}%
                          </p>

                        </div>

                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-4">

                        <div
                          className="bg-blue-600 h-4 rounded-full"
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>

                      </div>

                    </div>

                  );

                })}

              </div>

              {leader && (

                <div className="mt-8 bg-green-100 border border-green-300 rounded-lg p-5">

                  <h2 className="text-2xl font-bold text-green-700">
                    🏆 Current Leader
                  </h2>

                  <p className="mt-2 text-xl">
                    {leader.name}
                  </p>

                </div>

              )}

            </div>

          );

        })

      )}

    </div>
  );
}

export default Results;