import React, { useState, useEffect } from "react";

const Setting = () => {
  const [user, setUser] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token is missing.");
        }
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json", 
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

          
        const data = await response.json();

       
        setUser(data.allAdmin);

      } catch (err) {
        
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, []); 

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Admin Profile</h1>
      
      {user.map((user, i) => (
        <div key={i} className="mb-4">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

      ))}
      
     
    </div>
  );

};

export default Setting;
