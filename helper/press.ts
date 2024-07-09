import React from "react"
import { useSelector, useDispatch } from "react-redux";

export const usePress = ( handle : { handleSubmit: Function, handleInsert: Function, handleDelete: Function, handleChangeFocus :  Function } ) => {
    
    const { handleSubmit, handleInsert, handleDelete, handleChangeFocus } = handle

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
        
        if( ( event.keyCode >= 37 && event.keyCode <= 40 ) )
        {
          event.preventDefault();
          handleChangeFocus(event);
          return true;
        }
        
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handle]);

}