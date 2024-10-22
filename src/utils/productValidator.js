

const productValidator=(description)=>{
  
      const words = description.split(/\s+/);
    
      // Check if the number of words is less than 100
      if(words.length > 20){
        return "description should be less than 20 words"
      }
      else{
        return null
      }
  }
  export default productValidator 