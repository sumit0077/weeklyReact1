import { useState , useEffect } from 'react';

const Ui = ()=>{ 

    
    const purpleShadow = {
        boxShadow: '0px 0px 10px 5px'
      };

      const [password, setPassword] = useState('');
      const [passLenght, setPassLenght] = useState(22);
      const [passwordScore, setPasswordScrore] = useState("very weak");
      const [estimatedTimeToCrack, setEstimatedTimeToCrack] = useState("10 seconds");

      const [smallLetter, setSmallLetter] = useState(true);
      const [capitalLetter, setCapitalLetter] = useState(false);
      const [numberLetter, setNumberLetter] = useState(true);
      const [specialLetter, setSpecialLetter] = useState(false);
      

      const capitalString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numberString = "0123456789";
      const smallLetterString = "abcdefghijklmnopqrstuvwxyz";
      const specialCharacterString = "!@#$%^&*";
    
      const generatePassword = ()=>{
        let characterSet = "";
        let password= "";
       
        if(smallLetter == true){
          characterSet += smallLetterString;
        }
        if(capitalLetter == true){
          characterSet += capitalString;
        } 
        if(numberLetter == true){
          characterSet += numberString;
        }
        if(specialLetter === true){
          characterSet += specialCharacterString;
        }

        if(characterSet === ""){
          alert("select any one of the checkbox");
          setCapitalLetter(true)
        }

        for(let i = 0; i < passLenght; i++){
          password += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
        setPassword(password)
      }
    
      const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password);
        alert("Password copied to clipboard");
      };

      useEffect(() => {
        generatePassword();
      }, [specialLetter, smallLetter, capitalLetter, numberLetter, passLenght]);
      
      useEffect(() => {
        if(passLenght<4){
          setPasswordScrore("Very Weak");
          setEstimatedTimeToCrack("10 seconds");}
        else if(passLenght<8){
          setPasswordScrore("Weak");
          setEstimatedTimeToCrack("30 seconds");
        }  
        else if(passLenght>=8 && passLenght<16){
          setPasswordScrore("Strong");
          setEstimatedTimeToCrack("1 Week");
        }else{
          setPasswordScrore("Very Strong");
          setEstimatedTimeToCrack("1 Month");
        }
      }, [passLenght]);
    

    return (
    <div style={purpleShadow} className=" rounded-2xl shadow-2xl h-[80vh] w-[918px] flex flex-col gap-8 py-10">
      
        <div className="flex justify-evenly items-center text-blue-200">
          <p className="">Your password's score: <span className={`${passLenght>=8 ? 'text-green-500' :'text-red-500' }`}>{passwordScore}</span></p>
          <p className="">Estimated time to crack: <span className={`${passLenght>=8 ? 'text-green-500' :'text-red-500' }`}>{estimatedTimeToCrack}</span></p>
          
        </div>
        
        <div id="password-display-container" className="w-[828px] h-[128px] flex flex-wrap overflow-hidden  justify-center items-center text-white font-bold text-2xl rounded-2xl bg-[rgb(48,49,52)] mx-auto">
          {password}
        </div>

        <div className="flex items-center justify-center gap-5">
          <button onClick={() => copyToClipboard(password)} className="text-white font-bold  bg-[rgb(74,113,90)] w-[400px] text-[18px] py-2 rounded-full">Copy to Clipboard</button>
          <button onClick={generatePassword} className="text-white font-bold bg-[rgb(74,113,90)] w-[400px] text-[18px] py-2 rounded-full">Regenerate Password</button>
        </div>
        
        <div className="w-[828px] flex items-center mx-auto gap-64 pl-12">
          <span className="flex flex-col gap-2">
            <p className="text-4xl font-semibold text-blue-200">Type</p>
            <span className="flex gap-5">
              <span className="flex gap-2"><input type="radio" checked name="password" id="password" /><label htmlFor="password" className="text-white">Password</label></span>
              <span className="flex gap-2"><input type="radio" checked name="passphrase" id="passphrase" /><label htmlFor="passphrase" className="text-white">Passphrase</label></span>
            </span>
          </span>
          
          <span>
            <p className="text-4xl font-semibold text-blue-200 ">Characters:
             {/* <span className="">{passLenght}</span> */}
              <input onChange={(e) => setPassLenght(e.target.value)} className='ml-[10px] w-[80px] pl-2 text-white outline-none overflow-hidden  bg-black' type="number" value={passLenght} /> 
             </p>
          </span>
        </div>
        
        <div className="w-[828px] mx-auto pl-12 flex flex-col gap-2">
            <p className="text-3xl font-semibold text-blue-200">Additional Options</p>
            <span className="flex gap-5 hover:cursor-pointer">
              <span className="flex gap-2">
                <input onChange={() => setCapitalLetter(!capitalLetter)} checked={capitalLetter} type="checkbox" name="" id="" />
                <label className="text-white" htmlFor="">A-Z</label>
              </span>
              <span className="flex gap-2 hover:cursor-pointer">
                <input onChange={() => setSmallLetter(!smallLetter)}  checked={smallLetter} type="checkbox" name="" id="" />
                <label className="text-white" htmlFor="">a-z</label>
              </span>
              <span className="flex gap-2 hover:cursor-pointer">
                <input onChange={() => setNumberLetter(!numberLetter)}  checked={numberLetter} type="checkbox" name="" id="" />
                <label className="text-white" htmlFor="">0-9</label>
              </span>
              <span className="flex gap-2 hover:cursor-pointer">
                <input onChange={() => setSpecialLetter(!specialLetter)}  checked={specialLetter} type="checkbox" name="" id="" />
                <label className="text-white" htmlFor="">!@#$%^&*</label>
              </span>

            </span>
        </div>
    </div>
)}

export default Ui;