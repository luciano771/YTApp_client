import { TextField, Button, Input } from "@mui/material"; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs"; 
import utc from "dayjs/plugin/utc";

dayjs.extend(utc); // Habilita el método `.utc()`

type Video = {
   videoId: string;
   title: string;
   description: string;
   channelTitle: string;
   publishedAt: string;
   thumbnailUrl: string;
   videoUrl: string;
 };

const Dashboard = () => {
   const [includeWords, setIncludeWords] = useState("");
   const [search, setSearch] = useState("");

   const [excludeWords, setExcludeWords] = useState("");
   const [language, setLanguage] = useState("");
   const [regionCode, setRegionCode] = useState("");
   const [publishedAfter, setPublishedAfter] = useState<Dayjs | null>(null);
   const [data, setData] = useState<Video[]>([]);
   
   console.log(search + ","  + includeWords,excludeWords,language,regionCode,dayjs(publishedAfter).utc().format("YYYY-MM-DDTHH:mm:ss") + "Z")

   const handleSearch = async () => {
         fetch("https://ytapp-4ecd.onrender.com/search/search", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
               include: includeWords + ","  + search,
               exclude: excludeWords,
               regionCode: regionCode,
               relevanceLanguage: language,
               publishedAfter: publishedAfter
                  ? dayjs(publishedAfter).utc().format("YYYY-MM-DDTHH:mm:ss") + "Z"
                  : undefined
                           }),
                        })
         .then((response)=> response.json())
         .then((data)=> setData(data))
         .catch((err) => {
            console.error("Error al hacer la petición:", err); 
         })
   }

    return (
      <div className="flex flex-col gap-10 items-center justify-center "> 
          <div className="p-6 border border-red-900 rounded shadow space-y-4 w-full max-w-xl">
         <h2 className="text-xl font-semibold">Search for YouTube videos</h2>
         <hr/>
         <div className="flex gap-2 m-2 p-2">
         <TextField
                  fullWidth
                  label="Search"
                  id="fullWidth"
                  variant="outlined"
                  size="small"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}  
               />
            <Button variant="contained" onClick={handleSearch}>
            Search
         </Button>
         </div>
         <div className="grid grid-cols-2 gap-4 m-2 ">
            <Input placeholder="Include words" value={includeWords} onChange={(e) => setIncludeWords(e.target.value)} />
            <Input placeholder="Exclude words" value={excludeWords} onChange={(e) => setExcludeWords(e.target.value)} />
            <Input placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} /> 
            <Input placeholder="Region Code" value={regionCode} onChange={(e) => setRegionCode(e.target.value)} />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DatePicker
               label="Publish After"
               value={publishedAfter}
               onChange={(newValue) => setPublishedAfter(newValue)}
               />
            </LocalizationProvider>
			 
          
		    </div>
         </div>
         <div className="p-6 border border-red-900 rounded shadow space-y-4 max-h-[600px] overflow-y-auto scrollbar-custom">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {data.map((video) => (
                  <li key={video.videoId} className="flex gap-4 items-start text-white">
                     <img
                     src={video.thumbnailUrl}
                     alt={video.title}
                     className="w-32 h-20 object-cover rounded"
                     />
                     <div>
                     <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold hover:underline"
                     >
                        {video.title}
                     </a>
                     <p className="text-sm text-gray-400">{video.channelTitle}</p>
                     <p className="text-sm text-gray-500">
                        {new Date(video.publishedAt).toLocaleDateString()}
                     </p>
                     </div>
                  </li>
               ))}
            </div>
         </div> 
      </div>
  );
};

export default Dashboard;
