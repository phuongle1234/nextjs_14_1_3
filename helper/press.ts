import React from "react"
import { useSelector, useDispatch } from "react-redux";

export const usePress = ( handle : { handleSubmit: Function, handleInsert: Function, handleDelete: Function } ) => {
    
    const { handleSubmit, handleInsert, handleDelete } = handle

    const process = ! ( useSelector( (stage:any) => stage?.global )?.isLoading )

    React.useEffect(() => {
      const handleKeyDown = (event: any) => {
        
        const code = event.which || event.keyCode;
        
        let charCode = String.fromCharCode(code).toLowerCase();
        
        if ((event.ctrlKey || event.metaKey) && charCode === 's' && process) {
            
            event.preventDefault();
            handleSubmit(event)
            return true;
        } 

        if ((event.ctrlKey || event.metaKey) && charCode === '½' && process) {
            
          event.preventDefault();
          handleDelete(event)
          return true;
      }
        
        if ((event.shiftKey) &&  (event.ctrlKey || event.metaKey) && charCode === '»' && process) {
            
          event.preventDefault();
          handleInsert(event)
          //KeyDown(event)
          return true;
        } 

        // shiftKey  keyCode : 187

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
    }, [handle]);

}