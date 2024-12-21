const CompanyStats = () => {
    return (


        <div>
            <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-neutralSilver py-16">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    {/* Left Side: Text Content */}
                    <div className="md:w-1/2">
                        <h2 className="text-4xl text-neutralDGrey font-semibold mb-4 md:w-2/3">
                            Lorem ipsum sukaj sjkll <br />
                            <span className="text-brandPrimary">arlm ghost has in the town</span>
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ut, quasi
                        </p>
                    </div>

                    {/* Right Side: Members Grid */}
                    <div className="md:w-1/2 grid grid-cols-2 gap-8">
                        {/* Member 1 */}
                        <div className="flex items-center gap-4">
                            <img src="iconreact.png" alt="Icon 1" className="w-16 h-16 object-contain" />
                            <div>
                                <h4 className="text-2xl text-neutralDGrey font-semibold">2,233,344</h4>
                                <p>Members</p>
                            </div>
                        </div>

                        {/* Member 2 */}
                        <div className="flex items-center gap-4">
                            <img src="iconjs.png" alt="Icon 2" className="w-16 h-16 object-contain" />
                            <div>
                                <h4 className="text-2xl text-neutralDGrey font-semibold">2,233,344</h4>
                                <p>Members</p>
                            </div>
                        </div>

                        {/* Member 3 */}
                        <div className="flex items-center gap-4">
                            <img src="iconpython.png" alt="Icon 3" className="w-16 h-16 object-contain" />
                            <div>
                                <h4 className="text-2xl text-neutralDGrey font-semibold">2,233</h4>
                                <p>Members</p>
                            </div>
                        </div>

                        {/* Member 4 */}
                        <div className="flex items-center gap-4">
                            <img src="iconphp.png" alt="Icon 4" className="w-16 h-16 object-contain" />
                            <div>
                                <h4 className="text-2xl text-neutralDGrey font-semibold">2,233,344</h4>
                                <p>Members</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default CompanyStats;