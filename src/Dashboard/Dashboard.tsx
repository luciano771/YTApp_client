import { TextField, Button, Input, MenuItem, Select, InputLabel } from "@mui/material"; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs"; 
import utc from "dayjs/plugin/utc";  
import { useEffect } from 'react';

 

dayjs.extend(utc);  

type Video = {
   videoId: string;
   title: string;
   description: string;
   channelTitle: string;
   publishedAfter?: Dayjs | null; 
   thumbnailUrl: string;
   videoUrl: string;
 };

const Dashboard = () => {
 
   const [mostrar, setMostrar] = useState(false); 
   const [search, setSearch] = useState(""); 
   const [language, setLanguage] = useState("");
   const [regionCode, setRegionCode] = useState("");
   const [publishedAfter, setPublishedAfter] = useState<Dayjs | null>(null);
   const [data, setData] = useState<Video[]>([]);
   
    
   const buscarVideos = async ({
      includeWords,
      search,
      excludeWords,
      regionCode,
      language,
      publishedAfter,
    }: {
      includeWords: string;
      search: string;
      excludeWords: string;
      regionCode: string;
      language: string;
      publishedAfter: Dayjs | null;
    }): Promise<Video[]> => {
      console.log(includeWords,excludeWords,);

      try {
        const response = await fetch("https://ytapp-4ecd.onrender.com/search/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            include: tagsInWords.join(",") + "," + search,
            exclude: tagsExWords.join(","),
            regionCode,
            relevanceLanguage: language,
            publishedAfter:  publishedAfter
            ? dayjs(publishedAfter).utc().format("YYYY-MM-DDTHH:mm:ss") + "Z"
            : undefined
          }),
        });
    
        const data = await response.json();
        console.log(data); 
        return data as Video[]; // le decís al compilador que esperás un array de Video
      } catch (err) {
        console.error("Error al hacer la petición:", err);
        return [];
      }
    };
    
    const handleSearch = async () => {
      const data = await buscarVideos({
        includeWords,
        search,
        excludeWords,
        regionCode,
        language,
        publishedAfter 
      });
    
      if (data.length > 0) {
        setMostrar(true);
        setData(data);  
      }
    };

    const [tagsInWords, setTagsInWords] = useState([""]);
    const [includeWords, setIncludeWords] = useState("");
    
    const addIncludeTag = () =>{  
      if(!includeWords) return;
      setTagsInWords([...tagsInWords, includeWords]);
      setIncludeWords("");
    }
    const removeIncludeTag = (indexToRemove: number): void => {
      setTagsInWords(tagsInWords.filter((_, index) => index !== indexToRemove));
    };
    
    const [tagsExWords, setTagsExWords] = useState([""]);
    const [excludeWords, setExcludeWords] = useState("");

    const addExcludeTag = () =>{  
      if(!excludeWords) return;
      setTagsExWords([...tagsExWords, excludeWords]);
      setExcludeWords("");
    }
    const removeExcludeTag = (indexToRemove: number): void => {
      setTagsExWords(tagsExWords.filter((_, index) => index !== indexToRemove));
    };
    

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const name = e.currentTarget.name; 
        if (name === "include" && includeWords.trim() !== "") {
          addIncludeTag();
        } else if (name === "exclude" && excludeWords.trim() !== "") {
          addExcludeTag();
        }
      }
    };
    
    const [regionCodeJson, setRegionCodeJson] = useState<Record<string, string>>({}); 
  
    useEffect(() => {
      fetch('/regionCode')
        .then(res => res.json())
        .then(data => setRegionCodeJson(data))
        .catch(err => console.error("Error cargando JSON:", err));
    }, []);

    const [languageJson, setLanguageJson] = useState<Record<string, string>>({}); 
  
    useEffect(() => {
      fetch('/language')
        .then(res => res.json())
        .then(data => setLanguageJson(data))
        .catch(err => console.error("Error cargando JSON:", err));
    }, []);
    
    console.log(tagsInWords.join(","))
 

    // console.log(search + ","  + includeWords,excludeWords,language,regionCode,dayjs(publishedAfter).utc().format("YYYY-MM-DDTHH:mm:ss") + "Z")

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

            <div className="TagContainer">
            {tagsInWords.map((tag, index) =>
                tag !== "" && (
                  <div key={index} className="Intag"> 
                    {tag}
                    <button className="delete-btn"  onClick={() => removeIncludeTag(index)}>✖</button>
                  </div>
                  
                )
              )} 
              <Input placeholder="Include words" name="include" value={includeWords} onChange={(e) => setIncludeWords(e.target.value)}  onKeyDown={handleKeyDown} /> 
            </div> 

            <div className="TagContainer">
            {tagsExWords.map((tag, index) =>
                tag !== "" && (
                  <div key={index} className="Extag"> 
                    {tag}
                    <button className="delete-btn" onClick={() => removeExcludeTag(index)}>✖</button>
                  </div>
                  
                )
              )} 
              <Input placeholder="Exclude words" name="exclude" value={excludeWords} onChange={(e) => setExcludeWords(e.target.value)}  onKeyDown={handleKeyDown} /> 
            </div>
              
            <Select
              labelId=""
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              displayEmpty   
              renderValue={(selected) =>
                selected !== "" ? languageJson[selected] : "Select Language"
              }
            > 
              {Object.entries(languageJson).map(([code, name]) => (
                <MenuItem key={code} value={code}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            
            <Select
              labelId=""
              value={regionCode}
              onChange={(e) => setRegionCode(e.target.value)}
              displayEmpty  
              renderValue={(selected) =>
                selected !== "" ? regionCodeJson[selected] : "Select Country"
              }
            > 
              {Object.entries(regionCodeJson).map(([code, name]) => (
                <MenuItem key={code} value={code}>
                  {name}
                </MenuItem>
              ))}
            </Select>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DatePicker
               label="Publish After"
               value={publishedAfter}
               onChange={(newValue) => setPublishedAfter(newValue)}
               />
            </LocalizationProvider>
			  
		    </div>
         </div>
         {mostrar && setData.length > 0 && (
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
                     {video.publishedAfter && (
                        <p className="text-sm text-gray-500">
                           {new Date(video.publishedAfter.toString()).toLocaleDateString()}
                        </p>
                        )}
                     </div>
                  </li>
               ))}
            </div>
         </div>
         )} 
      </div>
  );
};

export default Dashboard;
