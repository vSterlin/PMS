import React, { useEffect, useState } from 'react'

const ShowDeliverable = ({id}) => {
  const [deliverables, setDeliverable] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("deliverables").get();

    };
    fetchData();
  }, []);
  return (
    <div>
      
    </div>
  )
}

export default ShowDeliverable
