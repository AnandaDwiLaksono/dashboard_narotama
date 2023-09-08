const Modal = (props) => {
  <dialog id={props.jenis} className="modal">
    <form method="dialog" className="modal-box">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>

      <h3 className="font-bold text-lg">Edit Status User</h3>
      <div>
        <div className="profil flex justify-center mb-2">
          <div className="avatar">
            <div className="w-24 rounded-full shadow-md ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://picsum.photos/200/300" />
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Username"
          className="input input-md input-bordered w-full mb-2"
          disabled
        />
        <input
          type="text"
          placeholder="Nama"
          className="input input-md input-bordered w-full mb-2"
          disabled
        />
        <input
          type="text"
          placeholder="Email"
          className="input input-md input-bordered w-full mb-2"
          disabled
        />
        <input
          type="text"
          placeholder="No HP"
          className="input input-md input-bordered w-full mb-2"
          disabled
        />
        <input
          type="text"
          placeholder="Saldo"
          className="input input-md input-bordered w-full mb-2"
          disabled
        />
        <input
          type="text"
          placeholder="Role"
          className="input input-md input-bordered w-full mb-2"
          disabled
        />
        <input
          type="text"
          placeholder="Status"
          className="input input-md input-bordered w-full mb-2"
        />
        <div className="flex justify-end">
          <button className="btn text-white bg-success hover:bg-success/70 active:bg-green-900">
            Submit
          </button>
        </div>
      </div>
    </form>
  </dialog>
};

export default Modal;
