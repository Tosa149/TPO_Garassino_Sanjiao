export default function Comments(props){
    return(
        <div>
            <div>
            <h1>Comentarios de {props.clase.name}</h1>
            {props.clase.comments.map((comment) => (
                <div> 
                    <h2>{comment.name} comento:</h2>
                    <p className="font-sans text-md">{comment.content}</p>
                </div>
            ))}
            </div>
            <div>
            <h1>Ratings de {props.clase.name}</h1>
            {props.clase.ratings.map((rating) => (
                <div> 
                    <h2>{rating.name} le dio un:</h2>
                    <p className="font-sans text-md">{rating.stars}/5</p>
                </div>
            ))}
            </div>
        </div>
    );
}