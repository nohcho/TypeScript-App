import React, { FC, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const CurrentTime: FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: undefined,
    hour12: false,
    timeZoneName: "short" // добавляет (UTC+X)
  }).format(currentTime);

  return (
        <Typography variant="body2" sx={{
          ml: "auto", color: "white"
        }}>
            {formattedTime}
        </Typography>
  );
};

export default CurrentTime;
