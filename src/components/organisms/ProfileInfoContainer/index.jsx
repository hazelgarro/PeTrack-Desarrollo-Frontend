export default function ProfileInfoContainer({children}){
    return (
        <div className="flex flex-wrap gap-3 justify-between">
            {children}
        </div>
    );
}