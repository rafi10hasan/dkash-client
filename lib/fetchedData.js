

const fetchedData = async(id,token)=>{
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/data/user-agent/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
    
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
    
      const data = await response.json();
      return data
}

export {fetchedData}