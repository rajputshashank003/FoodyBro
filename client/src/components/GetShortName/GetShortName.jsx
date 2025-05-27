
const GetShortName = ( {food_name} ) => {
    if( food_name.length <= 15) {
      return <>{food_name}</>
    }
    return (
      <>
        {
          food_name.split("").map((char, idx) => {
            if ( idx > 15 ) {
              return null;
            } 
            return <span key={idx} > {char} </span>
          })
        }
        ...
      </>
    )
}

export default GetShortName;