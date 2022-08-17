import React, { useRef, useEffect, useState } from "react";

export default function Countdown({countdownEnded}) {
  const [num, setNum] = useState(4080);
  
  let intervalRef = useRef();
  
  const decreaseNum = () => {
    setNum((prev) => prev - 1);
  }
  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      {num > -1 ? <p style={{fontSize : 80}}>{new Date(num * 1000).toISOString().substr(11, 8)}</p> 
      : <div>
        <p style={{fontSize: 80}}>{new Date(0 * 1000).toISOString().substr(11, 8)}</p> 
        <script type="text/javascript">
            {countdownEnded()}
        </script>
       </div>}
    </div>
  );
}
