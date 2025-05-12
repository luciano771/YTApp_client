
function Logo()
{
    return( 
        <div style={{
            display: "flex",
            gap: "6px",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ff4d4d",
            borderRadius: "8px",
            padding: "0px 6px",
            background: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 0 8px rgba(255, 0, 0, 0.3)"
          }}>          
          <h1 className="text-xl font-semibold">Tube</h1>
          <img src="logo.png" width="20px" /> 
          <h1 className="text-xl font-semibold">Xplore</h1> 
        </div> 
    );
}

export default Logo;