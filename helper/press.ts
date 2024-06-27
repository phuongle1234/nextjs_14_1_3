import React from "react"
import { useSelector, useDispatch } from "react-redux";

export const usePress = ( { KeyDown = (e:any) => { } } ) => {
    
    const process = ! ( useSelector( (stage:any) => stage?.global )?.isLoading )

    React.useEffect(() => {
      const handleKeyDown = (event: any) => {
        
        const code = event.which || event.keyCode;
        
        let charCode = String.fromCharCode(code).toLowerCase();

        if ((event.ctrlKey || event.metaKey) && charCode === 's' && process) {
            console.log( { process } );
            
            event.preventDefault();
            KeyDown(event)
            return true;
        } 
        
        // else if ((event.ctrlKey || event.metaKey) && charCode === 'c') {
        //   setState('CTRL+C');
        //   alert('CTRL+C Pressed');
        // } else if ((event.ctrlKey || event.metaKey) && charCode === 'v') {
        //   setState('CTRL+V');
        //   alert('CTRL+V Pressed');
        // }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [KeyDown]);

}