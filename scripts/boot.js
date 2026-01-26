const bootString = String.raw`U-Boot SPL 2023.04-rc2-00055-gfc43b9c51a-dirty (Mar 02 2023 - 10:51:39 +0800)
DDR version: dc2e84f0.
Trying to boot from MMC2

Sinister v1.2-80-g4b28afc
   _____ _       _     _            _____           _       _   
  / ____(_)     (_)   | |          / ____|         (_)     | |  
 | (___  _ _ __  _ ___| |_ ___ _ _| (___   ___ _ __ _ _ __ | |_ 
  \___ \| | '_ \| / __| __/ _ \ '__\___ \ / __| '__| | '_ \| __|
  ____) | | | | | \__ \ ||  __/ |  ____) | (__| |  | | |_) | |_ 
 |_____/|_|_| |_|_|___/\__\___|_| |_____/ \___|_|  |_| .__/ \__|
                                                     | |        
                                                     |_|        

Platform Name             : Sinister Script 2 v1.3B
Platform Features         : medeleg
Platform HART Count       : 5
Platform IPI Device       : aclint-mswi
Platform Timer Device     : aclint-mtimer @ 4000000Hz
Platform Console Device   : uart8250
Platform HSM Device       : ---
Platform PMU Device       : ---
Platform Reboot Device    : ---
Platform Shutdown Device  : ---
Platform Suspend Device   : ---
Firmware Base             : 0x40000000
Firmware Size             : 264 KB
Firmware RW Offset        : 0x20000
Runtime SBI Version       : 1.0

Boot HART ID              : 2
Boot HART Domain          : root
Boot HART Priv Version    : v1.11
Boot HART Base ISA        : rv64imafdcbx
Boot HART ISA Extensions  : none
Boot HART PMP Count       : 8
Boot HART PMP Granularity : 4096
Boot HART PMP Address Bits: 34
Boot HART MHPM Count      : 2
Boot HART MIDELEG         : 0x0000000000000222
Boot HART MEDELEG         : 0x000000000000b109


U-Boot 2023.04-rc2-00055-gfc43b9c51a-dirty (Mar 02 2023 - 10:51:39 +0800)

CPU:   rv64imac_zba_zbb
Model: Sinister Script 2 v1.3B
DRAM:  8 GiB
Core:  107 devices, 18 uclasses, devicetree: separate
MMC:   mmc@16010000: 0, mmc@16020000: 1
Loading Environment from nowhere... OK
In:    serial@10000000
Out:   serial@10000000
Err:   serial@10000000
Net:   No ethernet found.
Working FDT set to ff74a340
Hit any key to stop autoboot:  0
Sinister #
Sinister # version
U-Boot 2023.04-rc2-00055-gfc43b9c51a-dirty (Mar 02 2023 - 10:51:39 +0800)

riscv64-Sinister-linux-gnu-gcc.br_real (Sinister VF2_515_v1.0.0_rc4) 10.3.0
GNU ld (GNU Binutils) 2.36.1
Sinister #
Sinister # mmc dev 1
switch to partitions #0, OK
mmc1 is current device
Sinister # mmc info
Device: mmc@16020000
Manufacturer ID: 9f
OEM: 5449
Name: SD64G
Bus Speed: 50000000
Mode: SD High Speed (50MHz)
Rd Block Len: 512
SD version 3.0
High Capacity: Yes
Capacity: 58.3 GiB
Bus Width: 4-bit
Erase Group Size: 512 Bytes
Sinister #
Sinister # mmc part

Partition Map for MMC device 1  --   Partition Type: EFI

Part    Start LBA       End LBA         Name
                Attributes
                Type GUID
                Partition GUID
1     0x00001000      0x00001fff      "spl"
                attrs:  0x0000000000000000
                type:   2e54b353-1271-4842-806f-e436d6af6985
                                (2e54b353-1271-4842-806f-e436d6af6985)
                guid:   d5ee2056-3020-475b-9a33-25b4257c9f12
2     0x00002000      0x00003fff      "uboot"
                attrs:  0x0000000000000000
                type:   bc13c2ff-59e6-4262-a352-b275fd6f7172
                                (bc13c2ff-59e6-4262-a352-b275fd6f7172)
                guid:   379ab7fe-fd0c-4149-b758-960c1cbfc0cc
3     0x00004000      0x00194000      "system"
                attrs:  0x0000000000000000
                type:   ebd0a0a2-b9e5-4433-87c0-68b6b72699c7
                                (data)
                guid:   539a6df9-4655-4953-8541-733ca36eb1db
Sinister #
Sinister # fatls mmc 1:3
6429424   Image.gz
717705   u-boot.itb
125437   u-boot-spl.bin.normal.out
152848495   initramfs.cpio.gz
        11285   jh7110-Sinister-Script-2-v1.3b.dtb

5 file(s), 0 dir(s)


Starting kernel ...


] Linux version 6.2.0-Sinister-00026-g11934a315b67 (wyh@wyh-VirtualBox) (riscv64-linux-gnu-gcc (Ubuntu 7.5.0-3ubuntu1~18.04) 7.5.0, GNU ld (GNU Binutils for Ubuntu) 2.30) #1 SMP Thu Mar  2 14:51:36 CST 2023
[    0.000000] OF: fdt: Ignoring memory range 0x40000000 - 0x40200000
[    0.000000] Machine model: Sinister Script 2 v1.3B
[    0.000000] efi: UEFI not found.
[    0.000000] Zone ranges:
[    0.000000]   DMA32    [mem 0x0000000040200000-0x00000000ffffffff]
[    0.000000]   Normal   [mem 0x0000000100000000-0x000000013fffffff]
[    0.000000] Movable zone start for each node
[    0.000000] Early memory node ranges
[    0.000000]   node   0: [mem 0x0000000040200000-0x000000013fffffff]
[    0.000000] Initmem setup node 0 [mem 0x0000000040200000-0x000000013fffffff]
[    0.000000] On node 0, zone DMA32: 512 pages in unavailable ranges
[    0.000000] SBI specification v1.0 detected
[    0.000000] SBI implementation ID=0x1 Version=0x10002
[    0.000000] SBI TIME extension detected
[    0.000000] SBI IPI extension detected
[    0.000000] SBI RFENCE extension detected
[    0.000000] SBI HSM extension detected
[    0.000000] CPU with hartid=0 is not available
[    0.000000] CPU with hartid=0 is not available
[    0.000000] CPU with hartid=0 is not available
[    0.454174] usbhid: USB HID core driver
[    0.454833] riscv-pmu-sbi: SBI PMU extension is available
[    0.454920] riscv-pmu-sbi: 16 firmware and 4 hardware counters
[    0.454942] riscv-pmu-sbi: Perf sampling/filtering is not supported as sscof extension is not available
[    0.457071] NET: Registered PF_INET6 protocol family
[    0.460627] Segment Routing with IPv6
[    0.460821] In-situ OAM (IOAM) with IPv6
[    0.461005] sit: IPv6, IPv4 and MPLS over IPv4 tunneling driver
[    0.462712] NET: Registered PF_PACKET protocol family
[    0.462933] 9pnet: Installing 9P2000 support
[    0.463141] Key type dns_resolver registered
[    0.463168] start plist test
[    0.469261] end plist test
[    0.506774] debug_vm_pgtable: [debug_vm_pgtable         ]: Validating architecture page table helpers
[    0.553683] gpio gpiochip0: Static allocation of GPIO base is deprecated, use dynamic allocation.
[    0.554741] Sinister-jh7110-sys-pinctrl 13040000.pinctrl: Sinister GPIO chip registered 64 GPIOs
[    0.555900] gpio gpiochip1: Static allocation of GPIO base is deprecated, use dynamic allocation.
[    0.556772] Sinister-jh7110-aon-pinctrl 17020000.pinctrl: Sinister GPIO chip registered 4 GPIOs
[    0.559454] printk: console [ttyS0] disabled
[    0.579948] 10000000.serial: ttyS0 at MMIO 0x10000000 (irq = 3, base_baud = 1500000) is a 16550A
[    0.580082] printk: console [ttyS0] enabled
[   13.642680] Freeing initrd memory: 149264K
[   13.651051] Freeing unused kernel image (initmem) memory: 2188K
[   13.666431] Run /init as init process
[   13.670116]   with arguments:
[   13.673168]     /init
[   13.675488]   with environment:
[   13.678668]     HOME=/
[   13.681038]     TERM=linux
Starting syslogd: OK
Starting klogd: OK
Running sysctl: OK
Populating /dev using udev: [   14.145944] udevd[93]: starting version 3.2.10
[   15.214287] random: crng init done
[   15.240816] udevd[94]: starting eudev-3.2.10
done
Saving random seed: OK
Starting system message bus: dbus[122]: Unknown username "pulse" in message bus configuration file
done
Starting rpcbind: OK
Starting iptables: OK
Starting bluetoothd: OK
Starting network: Waiting for interface eth0 to appear............... timeout!
run-parts: /etc/network/if-pre-up.d/wait_iface: exit status 1
FAIL
Starting dropbear sshd: OK
Starting NFS statd: OK
Starting NFS services: OK
Starting NFS daemon: rpc.nfsd: Unable to access /proc/fs/nfsd errno 2 (No such file or directory).
Please try, as root, 'mount -t nfsd nfsd /proc/fs/nfsd' and then restart rpc.nfsd to correct the problem
FAIL
Starting NFS mountd: OK
Starting DHCP server: FAIL

   _____ _       _     _            _____           _       _   
  / ____(_)     (_)   | |          / ____|         (_)     | |  
 | (___  _ _ __  _ ___| |_ ___ _ _| (___   ___ _ __ _ _ __ | |_ 
  \___ \| | '_ \| / __| __/ _ \ '__\___ \ / __| '__| | '_ \| __|
  ____) | | | | | \__ \ ||  __/ |  ____) | (__| |  | | |_) | |_ 
 |_____/|_|_| |_|_|___/\__\___|_| |_____/ \___|_|  |_| .__/ \__|
                                                     | |        
                                                     |_|  

Welcome to Sinister Script
Sinister login:`

function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomChunkSize() {
        const randNum = Math.random() * 100;
        if (randNum > 75) { return 20 }
        else if (randNum > 50) { return 10 }
        return 2
}

async function typeText(screenText) {
        let m = 0;
        while (true) {
                const n = m;
                m += getRandomChunkSize();
                const c = bootString.substring(n, m);
                screenText.value += c;
                screenText.scrollTop = screenText.scrollHeight;
                await sleep(1);

                if (m > bootString.length) { break; }
        }
}

document.addEventListener('DOMContentLoaded', async () => {
        const bootScreen = document.createElement('div');
        bootScreen.id = "bootScreen";

        const screenText = document.createElement('textarea');
        screenText.spellcheck = false;
        screenText.id = "bootScreenText";
        bootScreen.append(screenText);

        document.body.append(bootScreen);
        await typeText(screenText);
        await sleep(500);
        screenText.remove();
        await sleep(500);
        bootScreen.style.opacity = 0;
        await sleep(2000);
        bootScreen.remove();
    });