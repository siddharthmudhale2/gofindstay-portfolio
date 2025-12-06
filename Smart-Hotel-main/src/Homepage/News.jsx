import React, { useState } from "react";
import clock from "../assets/img/clock.png";
import speech from "../assets/img/speech.png";
import Services from "../assets/img/services-bg.jpg";

const News = () => {
  const [referralEmail, setReferralEmail] = useState("");
  const [referralSuccess, setReferralSuccess] = useState(false);

  const handleReferralSubmit = (e) => {
    e.preventDefault();
    // Here you would add your actual referral logic, such as an API call
    console.log("Referral email submitted:", referralEmail);
    setReferralSuccess(true);
    setReferralEmail("");

    // Reset success message after 3 seconds
    setTimeout(() => {
      setReferralSuccess(false);
    }, 3000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section set-bg"
        style={{ backgroundImage: `url(${Services})` }}
      >
        <div className="hero-text">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1 style={{ textAlign: "left", paddingLeft: "5%" }}>News</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section style={{ padding: "60px 0", backgroundColor: "#f9f9f9" }}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
            {/* Sidebar */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Referral Section */}
                <div style={{ marginBottom: "30px" }}>
                  <h4
                    style={{
                      fontSize: "24px",
                      marginBottom: "20px",
                      color: "#333",
                    }}
                  >
                    Refer a Friend
                  </h4>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#555",
                        marginBottom: "20px",
                      }}
                    >
                      Refer a friend and both of you get{" "}
                      <strong>10% off</strong> your next stay!
                    </p>
                    {referralSuccess ? (
                      <div
                        style={{
                          backgroundColor: "#d4edda",
                          color: "#155724",
                          padding: "10px",
                          borderRadius: "4px",
                          textAlign: "center",
                          marginBottom: "20px",
                        }}
                      >
                        Referral sent successfully!
                      </div>
                    ) : (
                      <form onSubmit={handleReferralSubmit}>
                        <div style={{ marginBottom: "15px" }}>
                          <input
                            type="email"
                            style={{
                              width: "100%",
                              padding: "10px",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              fontSize: "16px",
                            }}
                            placeholder="Enter your friend's email address"
                            value={referralEmail}
                            onChange={(e) => setReferralEmail(e.target.value)}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          style={{
                            backgroundColor: "#ae9548",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "16px",
                            width: "100%",
                          }}
                        >
                          Send Referral
                        </button>
                      </form>
                    )}
                    <div
                      style={{
                        marginTop: "20px",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      <p>
                        Your referrals: <strong>3</strong>
                      </p>
                      <p>
                        Rewards earned: <strong>$45</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Categories Section */}
                <div style={{ marginBottom: "30px" }}>
                  <h4
                    style={{
                      fontSize: "24px",
                      marginBottom: "20px",
                      color: "#333",
                    }}
                  >
                    Categories
                  </h4>
                  <ul style={{ listStyle: "none", padding: "0" }}>
                    <li
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Accommodation{" "}
                      <span
                        style={{
                          backgroundColor: "#333",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        1
                      </span>
                    </li>
                    <li
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Nearby{" "}
                      <span
                        style={{
                          backgroundColor: "#333",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        9
                      </span>
                    </li>
                    <li
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Holidays{" "}
                      <span
                        style={{
                          backgroundColor: "#333",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        4
                      </span>
                    </li>
                    <li
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Events{" "}
                      <span
                        style={{
                          backgroundColor: "#333",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        2
                      </span>
                    </li>
                    <li
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      News{" "}
                      <span
                        style={{
                          backgroundColor: "#333",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        13
                      </span>
                    </li>
                    <li
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Restaurant{" "}
                      <span
                        style={{
                          backgroundColor: "#333",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        8
                      </span>
                    </li>
                    <li
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Wellness Treatments{" "}
                      <span
                        style={{
                          backgroundColor: "#333",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        11
                      </span>
                    </li>
                    <li
                      style={{
                        padding: "10px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Uncategorized{" "}
                      <span
                        style={{
                          backgroundColor: "#333",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        47
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div style={{ flex: "2", minWidth: "300px" }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "30px",
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div style={{ marginBottom: "15px" }}>
                    {/* <img src={${img / blog / blog - i.jpg}} alt="" style={{ width: "100%", borderRadius: "8px" }} /> */}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "24px",
                        marginBottom: "15px",
                        color: "#333",
                      }}
                    >
                      What you should know before going on holidays.
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginBottom: "15px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "20px",
                          fontSize: "14px",
                          color: "#777",
                        }}
                      >
                        <i className="lnr lnr-user"></i>
                        <span style={{ marginLeft: "5px" }}>Admin</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "20px",
                          fontSize: "14px",
                          color: "#777",
                        }}
                      >
                        <img
                          src={clock}
                          alt=""
                          style={{ marginRight: "5px" }}
                        />
                        <span>February 17, 2018</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "20px",
                          fontSize: "14px",
                          color: "#777",
                        }}
                      >
                        <img
                          src={speech}
                          alt=""
                          style={{ marginRight: "5px" }}
                        />
                        <span>4 Comments</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                          color: "#777",
                        }}
                      >
                        <i className="fa fa-folder-o"></i>
                        <span style={{ marginLeft: "5px" }}>Category</span>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#555",
                        marginBottom: "20px",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus libero mauris...
                    </p>
                    <a
                      href="#"
                      style={{
                        color: "#ae9548",
                        textDecoration: "none",
                        fontSize: "16px",
                      }}
                    >
                      Continue Reading <i className="lnr lnr-arrow-right"></i>
                    </a>
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <a
                    href="#"
                    key={i}
                    style={{
                      margin: "0 5px",
                      padding: "10px 15px",
                      backgroundColor: i === 1 ? "#ae9548" : "#f9f9f9",
                      color: i === 1 ? "#fff" : "#333",
                      textDecoration: "none",
                      borderRadius: "4px",
                    }}
                  >
                    {i}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;