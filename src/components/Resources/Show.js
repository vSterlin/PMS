import React, { useEffect, useState } from 'react'
import db from '../../firebase';

const ShowResource = ({id}) => {
  const [resources, setResource] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("resources").get();

    };
    fetchData();
  }, []);
  return (
    <div>
      
    </div>
  )
}

export default ShowResource
