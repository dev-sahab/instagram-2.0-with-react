import { useEffect, useState } from "react";

  // Show the post content component for showmore button
const ShowMore = ({ text }) => {

    // Define states variable to update
    const [isExpanded, setIsExpanded] = useState(false);
    const [lines, setLines] = useState([]);

    // effect to update the state when the text changes
    useEffect(() => {
        setLines(text.split("\n"));
    }, [text]);        

    // Get the first line of the text
    let firstLine = lines[0];
    // Determine if the text has more than one line
    let isExpandable = lines.length > 1;

    // If the text is expandable and not currently expanded, add an ellipsis to the end of the first line
    if (isExpandable && !isExpanded) {
        firstLine += " ...";
    }

    // Return a JSX element that displays the first line of the text, with a button to show more if the text is expandable
    return (
        <>
        {/* Display the first line of the text */}
        <span>{firstLine}</span>
        {/* If the text is expandable and not currently expanded, show a button to expand it */}
        {isExpandable && !isExpanded && (
            <>
            <button onClick={() => setIsExpanded(true)}>more</button>
            </>
        )}

        {/* If the text is expandable and currently expanded, show the full text */}
        {isExpandable && isExpanded && (
            <div>
            {/* print each line of the text without the first line */}
            {lines.slice(1).map((line, index) => (
                <span  key={index}>
                    <span>{line}</span>
                    <br />
                </span>
            ))}
            </div>
        )}
        </>
    );
}

export default ShowMore
