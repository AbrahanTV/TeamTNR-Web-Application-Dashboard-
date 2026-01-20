import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApplicants } from "/api/applicants";

const ApplicantDetail = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplicants()
      .then((data) => {
        const found = data.find((a) => a.id == id);
        if (found) {
          setApplicant(found);
        } else {
          setError("Applicant not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading applicant...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1>Applicant Details</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {applicant.firstName} {applicant.lastName}
          </h5>
          <p className="card-text">
            <strong>ID:</strong> {applicant.id}
            <br />
            <strong>Date of Birth:</strong> {applicant.dob}
            <br />
            <strong>Address:</strong> {applicant.street}, {applicant.city},{" "}
            {applicant.state} {applicant.zipCode}
            <br />
            <strong>Phone:</strong> {applicant.phoneNumber}
            <br />
            <strong>Email:</strong> {applicant.email || "N/A"}
            <br />
            <strong>Preferred Contact:</strong> {applicant.preferredContact}
            <br />
            <strong>Date of Submission:</strong> {applicant.dateOfSubmission}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
