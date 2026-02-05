import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApplicants } from "/api/applicants";
import { fetchHouseholds } from "/api/households";
import { fetchResidents } from "/api/residents";
import { fetchPets } from "/api/pets";
import { fetchCurrentPets } from "/api/currentPets";
import "/src/styles/applicant-detail.css";

const ApplicantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [household, setHousehold] = useState(null);
  const [residents, setResidents] = useState([]);
  const [pet, setPet] = useState(null);
  const [currentPet, setCurrentPets] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchApplicants(),
      fetchHouseholds(),
      fetchResidents(),
      fetchPets(),
      fetchCurrentPets(),
    ])
      .then(
        ([
          applicantData,
          householdData,
          residentData,
          petData,
          currentPetData,
        ]) => {
          const foundApplicant = applicantData.find((a) => a.id == id);
          const foundHousehold = householdData.find((h) => h.applicantId == id);
          const foundResidents = foundHousehold
            ? residentData.filter((r) => r.householdId == foundHousehold.id)
            : [];
          const foundPet = foundHousehold
            ? petData.find((p) => p.householdId == foundHousehold.id)
            : null;
          const foundCurrentPet = foundHousehold
            ? currentPetData.find((p) => p.householdId == foundHousehold.id)
            : null;

          if (!foundApplicant) {
            setError("Applicant not found");
            setLoading(false);
            return;
          }

          setApplicant(foundApplicant);
          if (foundHousehold) setHousehold(foundHousehold);
          setResidents(foundResidents);
          if (foundPet) setPet(foundPet);
          if (foundCurrentPet) setPet(foundCurrentPet);
          setLoading(false);
        },
      )
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="detail-loading">
        <div className="spinner"></div>
        <p>Loading applicant details...</p>
      </div>
    );

  if (error)
    return (
      <div className="detail-error">
        <h2>⚠️ {error}</h2>
        <button onClick={() => navigate("/admin")} className="back-btn">
          Back to Dashboard
        </button>
      </div>
    );

  return (
    <div className="applicant-detail-container">
      <div className="detail-header">
        <button onClick={() => navigate("/admin")} className="back-btn-small">
          ← Back
        </button>
        <div className="header-title">
          <h1>
            {applicant?.firstName} {applicant?.lastName}
          </h1>
          <p>Applicant ID: {applicant?.id}</p>
        </div>
      </div>

      <div className="detail-grid">
        {applicant && (
          <div className="detail-card applicant-main">
            <div className="card-header-detail">
              <h2>📋 Personal Information</h2>
              <span className="status-badge">Active</span>
            </div>
            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Full Name</label>
                  <p>
                    {applicant.firstName} {applicant.lastName}
                  </p>
                </div>
                <div className="detail-field">
                  <label>Applicant ID</label>
                  <p>{applicant.id}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Date of Birth</label>
                  <p>{applicant.dob}</p>
                </div>
                <div className="detail-field">
                  <label>Preferred Contact</label>
                  <p className="text-capitalize">
                    {applicant.preferredContact}
                  </p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Phone</label>
                  <p>
                    <a href={`tel:${applicant.phoneNumber}`} className="link">
                      {applicant.phoneNumber}
                    </a>
                  </p>
                </div>
                <div className="detail-field">
                  <label>Email</label>
                  <p>
                    <a href={`mailto:${applicant.email}`} className="link">
                      {applicant.email || "N/A"}
                    </a>
                  </p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field full-width">
                  <label>Submission Date</label>
                  <p>{applicant.dateOfSubmission}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {household ? (
          <div className="detail-card household-card">
            <div className="card-header-detail">
              <h2>🏠 Household Information</h2>
            </div>
            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Address</label>
                  <p href={`tel:${applicant.phoneNumber}`} className="">
                    {applicant.street}, {applicant.city}, {applicant.state}{" "}
                    {applicant.zipCode}
                  </p>
                </div>
                <div className="detail-field">
                  <label>Rent or Own</label>
                  <p className="text-capitalize">
                    {household.rentOwn || "N/A"}
                  </p>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-field">
                  <label>Type of Residence</label>
                  <p className="text-capitalize">
                    {household.residenceType || "N/A"}
                  </p>
                </div>
                <div className="detail-field">
                  <label>Pets Allowed</label>
                  <p>{household.petsAllowed ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Months at Address</label>
                  <p>{household.monthsAtAddress || "N/A"}</p>
                </div>
              </div>

              <div className="card-header-detail">
                <h2>👤 Household Members ({residents.length})</h2>
              </div>

              {residents.length > 0 ? (
                <div className="residents-list">
                  {residents.map((resident, index) => (
                    <div key={index} className="resident-item">
                      <div className="detail-row">
                        <div className="detail-field">
                          <label>Name</label>
                          <p>{resident.memberName || "N/A"}</p>
                        </div>
                        <div className="detail-field">
                          <label>Age</label>
                          <p>{resident.age || "N/A"}</p>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-field">
                          <label>Relationship</label>
                          <p className="text-capitalize">
                            {resident.relationship || "N/A"}
                          </p>
                        </div>
                        <div className="detail-field">
                          <label>Cat Allergies</label>
                          <p>{resident.catAllergies ? "Yes" : "No"}</p>
                        </div>
                      </div>
                      {index < residents.length - 1 && <hr />}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No resident information available</p>
              )}
            </div>
          </div>
        ) : (
          <div className="detail-card empty-state">
            <p>No household information available</p>
          </div>
        )}

        {/* {resident ? (
          <div className="detail-card resident-card">
            <div className="card-header-detail">
              <h2>👤 Household Members</h2>
            </div>
            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Name</label>
                  <p>{resident.memberName}</p>
                </div>
                <div className="detail-field">
                  <label>Age</label>
                  <p>{resident.age}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Relationship</label>
                  <p className="text-capitalize">
                    {resident.relationship || "N/A"}
                  </p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Cat Allergies</label>
                  <p>{resident.catAllergies ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="detail-card empty-state">
            <p>No resident information available</p>
          </div>
        )} */}

        {pet ? (
          <div className="detail-card resident-card">
            <div className="card-header-detail">
              <h2>🐱 Pet History</h2>
            </div>

            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Current Pets</label>
                  <p>{pet.hasCurrentPets ? "Yes" : "No"}</p>
                </div>
                <div className="detail-field">
                  <label>Previous Pets</label>
                  <p>{pet.previousPets || "None"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Vet Name</label>
                  <p>{pet.vetName || "N/A"}</p>
                </div>
                <div className="detail-field">
                  <label>Vet Phone</label>
                  <p>{pet.vetPhone || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Contact Vet?</label>
                  <p>{pet.contactVet ? "Yes" : "No"}</p>
                </div>
                <div className="detail-field">
                  <label>No Preference</label>
                  <p>{pet.noPreference ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Cat Age Preference</label>
                  <p>{pet.preferenceAge || "N/A"}</p>
                </div>
                <div className="detail-field">
                  <label>Cat Gender Preference</label>
                  <p>{pet.preferenceGender || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Personality Traits</label>
                  <p>{pet.personalityTraits || "N/A"}</p>
                </div>
                <div className="detail-field">
                  <label>Why Adopt?</label>
                  <p>{pet.whyAdopt || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Living Environment</label>
                  <p>{pet.catLivingArrangement || "N/A"}</p>
                </div>
                <div className="detail-field">
                  <label>Cat Stays When Away?</label>
                  <p>{pet.catStayWhenAway || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Hours Alone</label>
                  <p>{pet.hoursAlone || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="detail-card empty-state">
            <p>No pet information available</p>
          </div>
        )}

        {currentPet ? (
          <div className="detail-card resident-card">
            <div className="card-header-detail">
              <h2>🐱 Pet History</h2>
            </div>

            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Current Pets</label>
                  <p>{pet.hasCurrentPets ? "Yes" : "No"}</p>
                </div>
                <div className="detail-field">
                  <label>Previous Pets</label>
                  <p>{pet.previousPets || "None"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Vet Name</label>
                  <p>{pet.vetName || "N/A"}</p>
                </div>
                <div className="detail-field">
                  <label>Vet Phone</label>
                  <p>{pet.vetPhone || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Contact Vet?</label>
                  <p>{pet.contactVet ? "Yes" : "No"}</p>
                </div>
                <div className="detail-field">
                  <label>No Preference</label>
                  <p>{pet.noPreference ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Cat Age Preference</label>
                  <p>{pet.preferenceAge || "N/A"}</p>
                </div>
                <div className="detail-field">
                  <label>Cat Gender Preference</label>
                  <p>{pet.preferenceGender || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Personality Traits</label>
                  <p>{pet.personalityTraits || "N/A"}</p>
                </div>
                <div className="detail-field">
                  <label>Why Adopt?</label>
                  <p>{pet.whyAdopt || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Living Environment</label>
                  <p>{pet.catLivingArrangement || "N/A"}</p>
                </div>
                <div className="detail-field">
                  <label>Cat Stays When Away?</label>
                  <p>{pet.catStayWhenAway || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Hours Alone</label>
                  <p>{pet.hoursAlone || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="detail-card empty-state">
            <p>No pet information available</p>
          </div>
        )}

        <div className="detail-card actions-card">
          <h2>⚡ Quick Actions</h2>
          <div className="action-list">
            <button className="action-item edit">✏️ Edit</button>
            <button className="action-item approve">✅ Approve</button>
            <button className="action-item reject">❌ Reject</button>
            <button className="action-item print">🖨️ Print</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
