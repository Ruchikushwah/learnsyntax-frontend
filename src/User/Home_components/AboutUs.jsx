const AboutUs = () => {
    return (
        <div id="about"> 
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
        <div className="md:w-11/12 mx-auto flex flex-col  md:flex-row justify-between items-center gap-12">
            {/* Left-Aligned Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <img src="/aboutus.png" alt="About Us" className="w-full md:w-auto max-w-md h-auto object-contain" />
            </div>

            {/* Right-Aligned Text and Button */}
            <div className="w-full md:w-1/2">
                <h2 className="text-4xl text-neutralDGrey font-semibold mb-4 md:w-4/5">
                    Lorem ipsum sukaj sjkll arlm
                </h2>
                <p className="md:w-3/4 text-sm text-neutralGrey mb-8">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ut, quasi 
                    exercitationem ratione veniam nihil error recusandae officia, aliquam quis dolor, unde tempore saepe 
                    in praesentium necessitatibus repellendus nulla! Voluptates!
                </p>
                <button className="btn-primary">Learn More</button>
            </div>
        </div>
    </div>
</div>

    );
}

export default AboutUs;