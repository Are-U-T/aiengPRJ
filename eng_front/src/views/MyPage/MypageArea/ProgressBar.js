const ProgressBar = (props) => {
    const { bgcolor, completed } = props;

    const containerStyles = {
        height: 30,
        width: 200,
        backgroundColor: "#e0e0de",
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    }

    const fillerStyles = {
        transition: 'width 1s ease-in-out',
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right',
        paddingTop: 2
    }

    const labelStyles = {
        padding: 8,
        color: 'white',
        fontWeight: 'bold',
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;