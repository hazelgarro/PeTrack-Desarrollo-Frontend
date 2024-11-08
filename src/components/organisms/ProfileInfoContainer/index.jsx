export default function ProfileInfoContainer({children}){
    return (
        <div className="flex flex-wrap gap-4 lg:gap-10 justify-start ">
            {children}
        </div>
    );
}