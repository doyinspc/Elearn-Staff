import React from 'react';

const List = (props) => {
  
  return (
    <>
        <li class="list-group-item py-1">
            <a class="my-1 py-1" href="#" data-toggle="collapse" data-target={`#CollapseOne${props.data.id}`}
              aria-expanded="true" aria-controls={`CollapseOne${props.data.id}`}>
              {`${props.data.modulename} : ${props.data.title}`}
            </a>
        </li>
        <li 
          class="list-group-item collapse" 
          id={`CollapseOne${props.data.id}`} 
          aria-labelledby="headingOne"
          data-parent="#accordionExample">
            <p class="small">{props.data.description}</p>
            <p class="small">{props.data.objective}</p>
        </li>
     </>      
  );
}

  
export default List
